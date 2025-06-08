import { env } from 'bun';
import { Hono } from 'hono';
import checkPermission from '../helpers/checkPermission';
import { verify as jwtverify } from 'hono/jwt';
import { getNotifications } from '../services/notifications/get.service';
import { readAllNotifications, readNotification } from '../services/notifications/read.service';
import { getAllSubscriptionPackages } from 'services/subscriptions/getAll.service';
import { createUserSubscription } from 'services/subscriptions/createUserSubscription.service';

const subscriptionController = new Hono();

subscriptionController.get('/', async (c) => {
    const allSubscriptionPackagesResponse = await getAllSubscriptionPackages();
    return c.json(allSubscriptionPackagesResponse);
});

subscriptionController.post('/', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userId = jwtPayload.sub_id;
    const body = await c.req.json();
    const createSubscriptionResponse = await createUserSubscription(userId, body.packageId, body.currency);
    return c.json({ success: true, data: createSubscriptionResponse });
});

export default subscriptionController;
