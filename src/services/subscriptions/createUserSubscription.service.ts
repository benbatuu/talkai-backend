import { calculateEndDate } from 'helpers/calculateEndDate';
import { SubscriptionStatus } from '../../../prisma/generated/client';
import pc from '../../helpers/prismaclient.singleton';
import stripe from '../../helpers/stripe';
import HttpStatusCode from 'enums/httpstatuscode';
import { HTTPException } from 'hono/http-exception';

export const createUserSubscription = async (userId: string, packageId: string, currency: string) => {
    try {
        // const isUserHasSubscription = await pc.subscription.findFirst({
        //     where: {
        //         userId,
        //         OR: [
        //             { status: SubscriptionStatus.ACTIVE },
        //             { status: SubscriptionStatus.PENDING },
        //         ]
        //     },
        // });

        // if (isUserHasSubscription)
        //     throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'User already has an active subscription' });

        const user = await pc.user.findUnique({ where: { id: userId } });

        if (!user)
            throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: `User not found with ID: ${userId}` });

        const package_ = await pc.packages.findUnique({
            where: { id: packageId },
            include: { prices: true }
        });

        if (!package_)
            throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: `Package not found with ID: ${packageId}` });

        let stripeCustomerId = user.stripeCustomerId;
        if (!stripeCustomerId) {
            const customer = await stripe.createCustomer(
                user.email,
                `${user.firstname} ${user.lastname}`,
                { userId: user.id }
            );
            stripeCustomerId = customer.id;
        }

        const endDate = calculateEndDate(package_.duration);
        const subscription = await pc.subscription.create({
            data: {
                userId,
                packageId,
                endDate,
                status: SubscriptionStatus.ACTIVE,
                stripeCustomerId: stripeCustomerId,
            }
        });

        const price = package_.prices.find(p => p.currency === currency);

        if (!price)
            throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: `Price not available in currency: ${currency}` });

        const paymentIntent = await stripe.createPaymentIntent(
            Number(price.amount),
            price.currency,
            stripeCustomerId,
            {
                subscriptionId: subscription.id,
                packageId: package_.id
            },
        );

        await stripe.getInstance().paymentIntents.confirm(paymentIntent.id, {
            payment_method: 'pm_card_visa',
            payment_method_types: ['card'],
        });

        await pc.subscription.update({
            where: { id: subscription.id },
            data: {
                stripePaymentId: paymentIntent.id,
                stripeCustomerId: stripeCustomerId
            }
        });

        return {
            subscriptionId: subscription.id,
            clientSecret: paymentIntent.client_secret
        };
    } catch (error) {

        if (error instanceof HTTPException)
            throw error;

        throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, {
            message: error instanceof Error ?
                `Failed to create subscription: ${error.message}` :
                'Failed to create subscription: Unknown error'
        });
    }
};
