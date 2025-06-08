import pc from '../../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../../../enums/httpstatuscode';

export const editPermissionService = async (id: string, name: string | undefined, value: string | undefined, group: string | undefined, description: string | undefined, userID: string) => {
    const permission = await pc.permission.update({
        where: {
            id: id,
        },
        select: {
            id: true,
            name: true,
            value: true,
            group: true,
            description: true,
            createdat: true,
            createdby: true,
            updatedat: true,
            updatedby: true,
        },
        data: {
            name: name,
            value: value,
            group: group,
            description: description,
            updatedat: new Date(),
            updatedby: userID,
        },
    });

    if (!permission) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'permission_couln_not_be_updated' });

    return permission;
};
