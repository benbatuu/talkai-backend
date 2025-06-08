import { Hono } from 'hono';
import { env } from 'bun';
import { verify as jwtverify } from 'hono/jwt';
// Helpers
import checkPermission from '../helpers/checkPermission';
// Service
import { getService } from '../services/user/permission/get.service';
import { createPermissionService } from '../services/user/permission/create.service';
import { editPermissionService } from '../services/user/permission/update.service';


const permissionsController = new Hono();

permissionsController.get('/', checkPermission(['permission:view']), async (c) => {
    const permissions = await getService();
    return c.json(permissions);
});

permissionsController.post('/', checkPermission(['permission:create']), async (c) => {
    const { name, value, group, description } = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const createdPermission = await createPermissionService(name, value, group, description, userID);
    return c.json(createdPermission);
});

permissionsController.put('/:id', checkPermission(['permission:update']), async (c) => {
    const id = c.req.param('id');
    const { name, value, group, description } = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const updatedPermission = await editPermissionService(id, name, value, group, description, userID);
    return c.json(updatedPermission);
});

export default permissionsController;
