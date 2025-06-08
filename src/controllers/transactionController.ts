import { Hono } from 'hono';
import { env } from 'bun';
import { verify as jwtverify } from 'hono/jwt';
import EntranceStatus from '../enums/entranceStatuses';
import checkPermission from '../helpers/checkPermission';
import { createEntranceService } from '../services/transactions/entrance.service';
import { findIPAddress } from '../helpers/functions';

const transactionController = new Hono();

transactionController.post('/entrance', checkPermission(['entrance:create']), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userid = jwtPayload.sub_id;
    const body = await c.req.json();
    const entrance = await createEntranceService(body.token, EntranceStatus.ENTRANCE, c.req.header('User-Agent'), findIPAddress(c), userid);
    return c.json(entrance);
});

transactionController.post('/exit', checkPermission(['entrance:create']), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userid = jwtPayload.sub_id;
    const body = await c.req.json();
    const entrance = await createEntranceService(body.token, EntranceStatus.EXIT, c.req.header('User-Agent'), findIPAddress(c), userid);
    return c.json(entrance);
});

export default transactionController;
