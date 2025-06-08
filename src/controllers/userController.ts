import { Context, Hono, Next } from 'hono';
import { env } from 'bun';
import { verify as jwtverify, decode as jwtdecode } from 'hono/jwt';
import { getAllUsers } from '../services/user/getAll.service';
import { getUserById } from '../services/user/getSingle.service';
import { createService } from '../services/user/create.service';
import { archiveService } from '../services/user/passive.service';
import { activateService } from '../services/user/active.service';
import { profileService } from '../services/user/profile.service';
import { updateUser } from '../services/user/update.service';
import checkPermission from '../helpers/checkPermission';

const userController = new Hono();

userController.get('/', checkPermission(['user:view']), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const users = await getAllUsers(userID);
    return c.json(users);
});

userController.post('/', checkPermission(['user:create']), async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const createdby = jwtPayload.sub_id;
    const { firstname, lastname, email, password, phone, userroles, userpermissions } = await c.req.json();
    const user = await createService(firstname, lastname, email, password, phone, userroles, userpermissions, createdby);
    return c.json(user);
});

userController.put('/:id', checkPermission(['user:update']), async (c) => {
    const userID = c.req.param('id');
    const updates = await c.req.json();
    const user = await updateUser(userID, updates);
    return c.json(user);
});

userController.put('/:id/archive', checkPermission(['user:changestatus']), async (c) => {
    const id = c.req.param('id');
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const user = await archiveService(id, updatedby);
    return c.json(user);
});

userController.put('/:id/activate', checkPermission(['user:changestatus']), async (c) => {
    const id = c.req.param('id');
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const updatedby = jwtPayload.sub_id;
    const user = await activateService(id, updatedby);
    return c.json(user);
});

userController.get('/profile', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const id = jwtPayload.sub_id;
    const profile = await profileService(id);
    return c.json(profile);
});

export default userController;
