import Stripe from 'stripe';
import { env } from 'bun';
class StripeService {
    private stripe: Stripe;

    constructor() {
        const secretKey = env.STRIPE_SECRET_KEY;
        const webhookSecret = env.STRIPE_WEBHOOK_SECRET;


        if (!secretKey) {
            throw new Error('STRIPE_SECRET_KEY must be set in environment variables');
        }
        if (!webhookSecret) {
            throw new Error('STRIPE_SECRET_KEY must be set in environment variables');
        }

        this.stripe = new Stripe(secretKey, {
            typescript: true,
        });
    }

    async createPaymentIntent(amount: number, currency: string, customerId: string, metadata: any) {
        return this.stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: currency.toLowerCase(),
            customer: customerId,
            metadata,
            payment_method_types: ['card'],
        });
    }

    async createCustomer(email: string, name: string, metadata: any) {
        return this.stripe.customers.create({
            email,
            name,
            metadata,
        });
    }

    verifyWebhookSignature(payload: string, signature: string) {
        return this.stripe.webhooks.constructEvent(
            payload,
            signature,
            env.STRIPE_SECRET_SECRET!
        );
    }

    // Get Stripe instance
    getInstance() {
        return this.stripe;
    }

    getTestCards() {
        return {
            success: {
                number: '4242 4242 4242 4242',
                exp_month: 12,
                exp_year: 2024,
                cvc: '123'
            },
            failed: {
                number: '4000 0000 0000 0002',
                exp_month: 12,
                exp_year: 2024,
                cvc: '123'
            },
            requiresAuthentication: {
                number: '4000 0025 0000 3155',
                exp_month: 12,
                exp_year: 2024,
                cvc: '123'
            }
        };
    }
}

const stripeService = new StripeService();
export default stripeService;
