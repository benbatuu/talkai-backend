import { Context, Next } from 'hono';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../enums/httpstatuscode';
import pc from '../helpers/prismaclient.singleton';
import { SubscriptionStatus } from '../../prisma/generated/client';

export async function checkSubscriptionLimits(c: Context, next: Next) {
    try {
        const userId = c.get('userId'); // Assuming userId is set in JWT middleware

        // Get user's active subscription
        const activeSubscription = await pc.subscription.findFirst({
            where: {
                userId,
                status: SubscriptionStatus.ACTIVE,
                endDate: {
                    gt: new Date() // Check if subscription hasn't expired
                }
            },
            include: {
                package: {
                    include: {
                        features: true
                    }
                }
            }
        });

        // Helper function to parse feature value
        const getFeatureLimit = (featureName: string): number => {
            const feature = activeSubscription?.package.features.find(f => f.feature === featureName);
            return feature && feature.available ? parseInt(feature.feature.split(':')[1]) || 0 : 0;
        };

        // Get current month's usage
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        // Example: Check chat messages limit
        const chatLimit = getFeatureLimit('chat_messages');
        if (chatLimit > 0) {
            const monthlyChats = await pc.chat.count({
                where: {
                    userId: userId,
                    createdAt: {
                        gte: startOfMonth
                    }
                }
            });

            if (monthlyChats >= chatLimit) {
                throw new HTTPException(HttpStatusCode.FORBIDDEN, {
                    message: 'Monthly chat message limit exceeded'
                });
            }
        }

        // Example: Check learning languages limit
        const languageLimit = getFeatureLimit('learning_languages');
        if (languageLimit > 0) {
            const activeLanguages = await pc.learningProgress.count({
                where: {
                    userid: userId,
                    progress: {
                        gt: 0
                    }
                }
            });

            if (activeLanguages >= languageLimit) {
                throw new HTTPException(HttpStatusCode.FORBIDDEN, {
                    message: 'Active learning languages limit exceeded'
                });
            }
        }

        // Store subscription data in context for route handlers
        c.set('subscription', activeSubscription);
        
        await next();
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
            message: error instanceof Error ? error.message : 'Error checking subscription limits'
        });
    }
}
