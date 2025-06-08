import { Hono } from 'hono';
import { env } from 'bun';
import { verify as jwtverify } from 'hono/jwt';
// Helpers
import checkPermission from '../helpers/checkPermission';
// Services
import { getService } from '../services/user/role/get.service';
import { createRoleService } from '../services/user/role/create.service';
import { editRoleService } from '../services/user/role/edit.service';
import { deleteRoleService } from '../services/user/role/delete.service';


const rolesController = new Hono();

rolesController.get('/', checkPermission(['role:view']), async (c) => {
    const roles = await getService();
    return c.json(roles);
});

rolesController.post('/', checkPermission(['role:create']), async (c) => {
    const { name, rolepermissions } = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const createdRole = await createRoleService(name, rolepermissions, userID);
    return c.json(createdRole);
});

rolesController.put('/:id', checkPermission(['role:update']), async (c) => {
    const id = c.req.param('id');
    const { name, rolepermissions } = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const updatedRole = await editRoleService(id, name, userID, rolepermissions);
    return c.json(updatedRole);
});

rolesController.delete('/:id', checkPermission(['role:delete']), async (c) => {
    const id = c.req.param('id');
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const deletedRole = await deleteRoleService(id);
    return c.json(deletedRole);
});

export default rolesController;
