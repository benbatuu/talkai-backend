import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../../enums/httpstatuscode';

export const checkPaymentStatus = async (event: any) => {
    try {
        const { subscriptionId } = event.data.object.metadata;

        if (!subscriptionId)
            throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'Subscription ID not found in metadata' });

        const subscription = await pc.subscription.findUnique({
            where: { id: subscriptionId }
        });

        if (!subscription)
            throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'Subscription not found' });


        if (event.type === 'payment_intent.succeeded') {
            await pc.subscription.update({
                where: { id: subscriptionId },
                data: {
                    status: 'ACTIVE',
                    lastPaymentStatus: 'succeeded',
                    updatedAt: new Date()
                }
            });
        } else if (event.type === 'payment_intent.payment_failed') {
            await pc.subscription.update({
                where: { id: subscriptionId },
                data: {
                    status: 'FAILED',
                    lastPaymentStatus: 'failed',
                    updatedAt: new Date()
                }
            });
        }

        return { success: true };
    } catch (error) {
        if (error instanceof HTTPException) 
            throw error;
        throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, { message: 'Failed to check payment status' });
    }
};
