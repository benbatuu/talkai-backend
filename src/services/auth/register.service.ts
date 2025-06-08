import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import UserStatus from '../../enums/userStatuses';
import HttpStatusCode from '../../enums/httpstatuscode';
import * as bcrypt from 'bcrypt';

export const registerService = async (firstname: string, lastname: string, email: string, password: string, createdby: string) => {

    const existingUser = await pc.user.findFirst({
        where: {
            email: email,
        },
    });

    if (existingUser) {
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'user_already_exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await pc.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword, // Use the hashed password
            createdby: createdby,
            status: UserStatus.ACTIVE, // Default status
        },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            status: true,
            createdat: true,
        }
    });

    // Assign default role (role ID 2) and permissions (IDs 1 and 2)
    const defaultRoleId = '2'; // Assuming '2' is a valid role ID string
    const defaultPermissionIds = ['1', '2']; // Assuming '1' and '2' are valid permission ID strings

    // Assign default role
    await pc.userrole.create({
        data: {
            userid: newUser.id,
            roleid: defaultRoleId,
            createdby: createdby, // Or a system user ID if applicable
        },
    });

    // Assign default permissions
    const userPermissionsData = defaultPermissionIds.map(permissionId => ({
        userid: newUser.id,
        permissionid: permissionId,
        createdby: createdby, // Or a system user ID if applicable
    }));

    await pc.userpermission.createMany({
        data: userPermissionsData,
        skipDuplicates: true, // Optional: skip if a permission is already assigned
    });

    return {
        data: newUser,
        message: "user_registered_successfully_please_login_to_your_account"
    };
};