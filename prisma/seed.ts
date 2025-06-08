import { v4 as uuidv4 } from 'uuid';
import pc from '../src/helpers/prismaclient.singleton';
import * as bcrypt from 'bcrypt';


const roles = [
    { id: uuidv4(), name: "Admin Role" },
    { id: uuidv4(), name: "User Role" }
]

const permissions = [
    {
        id: uuidv4(),
        name: "Entrance Permission",
        description: "User can enter to application if user not block",
        value: "transactions:entrance",
        group: "transactions"
    },
    {
        id: uuidv4(),
        name: "Auth Permission",
        description: "User can authorize to application",
        value: "auth:authorize",
        group: "auth"
    },
    {
        id: uuidv4(),
        name: "Login Permission",
        description: "User can login to application",
        value: "auth:login",
        group: "auth"
    },
    {
        id: uuidv4(),
        name: "Register Permission",
        description: "User can register to application",
        value: "auth:register",
        group: "auth"
    },
    {
        id: uuidv4(),
        name: "ForgetPassword Permission",
        description: "User can send an email to refresh own password",
        value: "auth:forgetpassword",
        group: "auth"
    },
    {
        id: uuidv4(),
        name: "ResetPasswor Permission",
        description: "User can reset own password",
        value: "auth:resetpassword",
        group: "auth"
    },
    {
        id: uuidv4(),
        name: "Logout Permission",
        description: "User can logout to application",
        value: "auth:logout",
        group: "auth"
    },
    {
        id: uuidv4(),
        name: "Get Notifications Permission",
        description: "User can get own notifications",
        value: "notifications:get",
        group: "notifications"
    },
    {
        id: uuidv4(),
        name: "Read Notifications Permission",
        description: "User can read own notifications",
        value: "notifications:read",
        group: "notifications"
    },
    {
        id: uuidv4(),
        name: "Create Permission Permission",
        description: "User can create a permission",
        value: "permissions:create",
        group: "permissions"
    },
    {
        id: uuidv4(),
        name: "Get Permissions Permission",
        description: "User can get permissions list",
        value: "permissions:get",
        group: "permissions"
    },
    {
        id: uuidv4(),
        name: "Update Permission Permission",
        description: "User can update a permission",
        value: "permissions:update",
        group: "permissions"
    },
    {
        id: uuidv4(),
        name: "Create Role Permission",
        description: "User can create a role",
        value: "roles:create",
        group: "roles"
    },
    {
        id: uuidv4(),
        name: "Delete Role Permission",
        description: "User can delete a role",
        value: "roles:delete",
        group: "roles"
    },
    {
        id: uuidv4(),
        name: "Update Role Permission",
        description: "User can update a role",
        value: "roles:update",
        group: "roles"
    },
    {
        id: uuidv4(),
        name: "Get Roles Permission",
        description: "User can get roles list",
        value: "roles:get",
        group: "roles"
    },
    {
        id: uuidv4(),
        name: "User Activate Permission",
        description: "User can make passive users active.",
        value: "user:activate",
        group: "user"
    },
    {
        id: uuidv4(),
        name: "User Passive Permission",
        description: "User can make active users passive.",
        value: "user:passive",
        group: "user"
    },
    {
        id: uuidv4(),
        name: "User Create Permission",
        description: "User can create a new user manually.",
        value: "user:create",
        group: "user"
    },
    {
        id: uuidv4(),
        name: "User Get All Permission",
        description: "User can get all users list.",
        value: "user:getall",
        group: "user"
    },
    {
        id: uuidv4(),
        name: "User Get Single Permission",
        description: "User can get a single user detail.",
        value: "user:getsingle",
        group: "user"
    },
    {
        id: uuidv4(),
        name: "User Profile Permission",
        description: "User can show own profile.",
        value: "user:profile",
        group: "user"
    },
    {
        id: uuidv4(),
        name: "User Update Permission",
        description: "User can update own info.",
        value: "user:update",
        group: "user"
    },
    {
        id: uuidv4(),
        name: "User Languages Permission",
        description: "User can see all languages",
        value: "languages:getall",
        group: "languages"
    },
    {
        id: uuidv4(),
        name: "User Create Language Permission",
        description: "User can create a new language",
        value: "languages:create",
        group: "languages"
    },
    {
        id: uuidv4(),
        name: "User Update Language Permission",
        description: "User can update a language",
        value: "languages:update",
        group: "languages"
    },
]

const languages = [
    {
        id: uuidv4(),
        flag: "🇬🇧",
        name: "English",
        code: "en",
    },
    {
        id: uuidv4(),
        flag: "🇹🇷",
        name: "Türkçe",
        code: "tr",
    },
    {
        id: uuidv4(),
        flag: "🇩🇪",
        name: "Deutsch",
        code: "de",
    },
    {
        id: uuidv4(),
        flag: "🇫🇷",
        name: "Français",
        code: "fr",
    },
    {
        id: uuidv4(),
        flag: "🇪🇸",
        name: "Español",
        code: "es",
    },
    {
        id: uuidv4(),
        flag: "🇮🇹",
        name: "Italiano",
        code: "it",
    },
    {
        id: uuidv4(),
        flag: "🇵🇹",
        name: "Português",
        code: "pt",
    },
    {
        id: uuidv4(),
        flag: "🇷🇺",
        name: "Русский",
        code: "ru",
    }
]

enum Duration {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
    LIFETIME = 'LIFETIME',
}

enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    TRY = 'TRY',
}
async function main() {

    await pc.user.create({
        data: {
            id: '948f77f0-81d5-450d-b15c-7782804abc20',
            firstname: 'Batuhan',
            lastname: 'Küçük',
            email: 'bennbatuu@gmail.com',
            password: await bcrypt.hash('112233Batuhan!.', 12),
            phone: '905555555555',
            appLanguage: 'tr',
            theme: 'light',
            avatar: 'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/2b/2bcb79dbc6d07bc84af63b91b3f2be1ca8a476ff.jpg',
            learningLanguage: languages[0].code, // English
            status: 1,
            createdby: '948f77f0-81d5-450d-b15c-7782804abc20',
            lastentranceat: new Date(),
            lastloginat: new Date(),
            createdat: new Date(),
            updatedat: new Date(),
        }
    })

    await pc.apiclient.create({
        data: {
            name: 'TalkAI Api Client',
            key: 'EEqAqOIqQVYKZnEpDBbmHymByUdZiaMI',
            secret: 'xPbYkToOxYCTocXmhqXbsCKqwlkrCgtD',
            type: 1,
            isactive: true,
            createdby: '948f77f0-81d5-450d-b15c-7782804abc20',
            createdat: new Date(),
        },
    });

    await pc.languages.createMany({
        data: languages.map(language => ({
            id: language.id,
            flag: language.flag,
            name: language.name,
            code: language.code,
        })),
    });

    await pc.role.createMany({
        data: roles.map(role => ({
            id: role.id,
            name: role.name,
            createdby: '948f77f0-81d5-450d-b15c-7782804abc20',
            createdat: new Date(),
        })),
    });

    await pc.permission.createMany({
        data: permissions.map(permission => ({
            id: permission.id,
            name: permission.name,
            description: permission.description,
            value: permission.value,
            group: permission.group,
            createdby: '948f77f0-81d5-450d-b15c-7782804abc20',
            createdat: new Date(),
        })),
    });

    await pc.rolepermission.createMany({
        data: permissions.map(permission => ({
            roleid: roles[0].id, // Assigning all permissions to Admin Role
            permissionid: permission.id,
            createdby: '948f77f0-81d5-450d-b15c-7782804abc20',
            createdat: new Date(),
        })),
    });

    await pc.userrole.create({
        data: {
            userid: '948f77f0-81d5-450d-b15c-7782804abc20',
            roleid: roles[0].id, // Assigning Admin Role to the user
            createdby: '948f77f0-81d5-450d-b15c-7782804abc20',
            createdat: new Date(),
        }
    });
    await pc.userpermission.createMany({
        data: permissions.map(permission => ({
            userid: '948f77f0-81d5-450d-b15c-7782804abc20',
            permissionid: permission.id,
            createdby: '948f77f0-81d5-450d-b15c-7782804abc20',
            createdat: new Date(),
        })),
    });

    // Create packages with enhanced details
    await pc.packages.create({
        data: {
            name: 'Basic',
            description: 'Perfect for individual users.',
            icon: 'Zap',
            duration: Duration.MONTHLY,
            popular: false,
            highlightColor: 'blue',
            features: {
                create: [
                    { feature: '50 prompt per day' },
                    { feature: 'Basic AI chat capabilities' },
                    { feature: 'Message history for 30 days' },
                    { feature: 'Basic file uploads (up to 5MB)' },
                    { feature: 'Email support' }
                ]
            },
            prices: {
                create: [
                    { currency: Currency.USD, amount: 14.99 },
                    { currency: Currency.EUR, amount: 13.99 },
                    { currency: Currency.TRY, amount: 449.99 }
                ]
            }
        }
    });

    await pc.packages.create({
        data: {
            name: 'Pro',
            description: 'Best value for power users.',
            icon: 'Star',
            duration: Duration.YEARLY,
            popular: true,
            highlightColor: 'green',
            savings: 'Save 33%',
            features: {
                create: [
                    { feature: '100 messages per day' },
                    { feature: 'Advanced AI capabilities' },
                    { feature: 'Message history for 60 days' },
                    { feature: 'Large file uploads (up to 10MB)' },
                    { feature: 'Voice chat enabled' },
                    { feature: 'Priority feature requests', available: false }
                ]
            },
            prices: {
                create: [
                    { currency: Currency.USD, amount: 119.99 },
                    { currency: Currency.EUR, amount: 109.99 },
                    { currency: Currency.TRY, amount: 3599.99 }
                ]
            }
        }
    });

    await pc.packages.create({
        data: {
            name: 'Enterprise',
            description: 'Ultimate access with no limits.',
            icon: 'Crown',
            duration: Duration.LIFETIME,
            popular: false,
            highlightColor: 'purple',
            features: {
                create: [
                    { feature: 'Unlimited messages' },
                    { feature: 'Premium AI capabilities' },
                    { feature: 'Permanent message history' },
                    { feature: 'Extra large files (up to 50MB)' },
                    { feature: 'Priority 24/7 support' },
                    { feature: 'Voice chat enabled' },
                    { feature: 'Early access to new features' },
                    { feature: 'Dedicated account manager' }
                ]
            },
            prices: {
                create: [
                    { currency: 'USD', amount: 499.99 },
                    { currency: 'EUR', amount: 459.99 },
                    { currency: 'TRY', amount: 14999.99 }
                ]
            }
        }
    });
}

main()
    .then(async () => {
        await pc.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await pc.$disconnect()
        process.exit(1)
    })
