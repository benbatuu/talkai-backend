import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../../enums/httpstatuscode';
import UserStatus from '../../enums/userStatuses';

export const archiveService = async (userid: string, updatedby: string) => {
    const user = await pc.user.findUnique({ where: { id: userid } });
    if (!user) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'no_selected_user_found' });

    if (user.status === UserStatus.INACTIVE) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'user_already_inactive' });

    await pc.user.update({
        where: { id: userid },
        data: {
            status: UserStatus.INACTIVE,
            updatedat: new Date(),
            updatedby: updatedby,
        },
    });

    return { data: user, message: 'user_status_changed_active_to_passive_successfully' };
};
