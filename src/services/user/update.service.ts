import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../../enums/httpstatuscode';

export const updateUser = async (
    userID: string,
    // Dinamik güncellemeler için tüm alanlar nullable (isteğe bağlı) olarak tanımlandı
    updates: {
        firstname?: string | null;
        lastname?: string | null;
        email?: string | null;
        password?: string | null;
        phone?: string | null;
        theme?:string;
        userroles?: Array<string> | null;
        userpermissions?: Array<string> | null;
        learningLanguage?: string | null;
    }
) => {
    const user = await pc.user.findUnique({ where: { id: userID } });
    if (!user) {
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'no_selected_user_found' });
    }

    // Güncellenecek verileri dinamik olarak oluştur
    const dataToUpdate: Record<string, any> = {
        updatedat: new Date(),
        updatedby: userID,
    };

    // E-posta kontrolü ve güncellemesi
    if (updates.email !== undefined && updates.email !== null) {
        if (user.email !== updates.email) {
            const emailExists = await pc.user.findFirst({ where: { email: updates.email } });
            if (emailExists && emailExists.id !== userID) { // Başka bir kullanıcıya ait olup olmadığını kontrol et
                throw new HTTPException(HttpStatusCode.CONFLICT, { message: 'email_already_exists' });
            }
        }
        dataToUpdate.email = updates.email;
    }

    // Diğer temel alanları dinamik olarak ata
    if (updates.firstname !== undefined) {
        dataToUpdate.firstname = updates.firstname;
    }
    if (updates.lastname !== undefined) {
        dataToUpdate.lastname = updates.lastname;
    }
    if (updates.password !== undefined) {
        // Şifre güncelleniyorsa, burada şifreyi hash'leme işlemini de yapmalısın.
        // Güvenlik nedeniyle düz metin şifre saklanmamalıdır.
        // Örn: dataToUpdate.password = await hashPassword(updates.password);
        dataToUpdate.password = updates.password;
    }
    if (updates.phone !== undefined) {
        dataToUpdate.phone = updates.phone;
    }
    if (updates.learningLanguage !== undefined) {
        dataToUpdate.learningLanguage = updates.learningLanguage;
    }

    if (updates.theme !== undefined) {
        dataToUpdate.theme = updates.theme;
    }

    // userroles güncellemesi
    if (updates.userroles !== undefined) {
        // Eğer updates.userroles null ise veya boş bir array ise, ilgili kayıtları sileriz.
        // Dolu bir array ise, önce hepsini silip sonra yenilerini ekleriz.
        dataToUpdate.userroles = {
            deleteMany: {}, // Mevcut tüm rolleri sil
        };
        if (updates.userroles && updates.userroles.length > 0) {
            dataToUpdate.userroles.createMany = {
                data: updates.userroles.map((role) => ({
                    roleid: role,
                    createdby: userID,
                    createdat: new Date(),
                })),
            };
        }
    }

    // userpermissions güncellemesi
    if (updates.userpermissions !== undefined) {
        // Eğer updates.userpermissions null ise veya boş bir array ise, ilgili kayıtları sileriz.
        // Dolu bir array ise, önce hepsini silip sonra yenilerini ekleriz.
        dataToUpdate.userpermissions = {
            deleteMany: {}, // Mevcut tüm izinleri sil
        };
        if (updates.userpermissions && updates.userpermissions.length > 0) {
            dataToUpdate.userpermissions.createMany = {
                data: updates.userpermissions.map((permission) => ({
                    permissionid: permission,
                    createdby: userID,
                    createdat: new Date(),
                })),
            };
        }
    }

    const updatedUser = await pc.user.update({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            theme: true,
            avatar: true,
            phone: true,
            learningLanguage: true,
            createdat: true,
            createdby: true,
            updatedat: true, // Eklendi
            updatedby: true, // Eklendi
            userroles: {
                select: {
                    role: {
                        select: {
                            name: true,
                            rolepermissions: {
                                select: {
                                    permission: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            userpermissions: {
                select: {
                    permission: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
        where: {
            id: userID,
        },
        data: dataToUpdate,
    });

    return { data: updatedUser, message: 'user_updated_successfully' };
};