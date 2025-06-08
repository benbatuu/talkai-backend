import pc from '../../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../../../enums/httpstatuscode';

export const deleteRoleService = async (roleid: string) => {
    // delete related
    const role = await pc.role.delete({
        where: {
            id: roleid,
            AND: {
                issystemrole: false,
            },
        },
    });

    if (!role) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'role_could_not_delete' });

    return role;
};
