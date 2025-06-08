import HttpStatusCode from 'enums/httpstatuscode';
import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';


export const getAllSubscriptionPackages = async () => {

    const allSubscriptionPackages = await pc.packages.findMany({
        orderBy: {
            id: 'asc',
        },
        include: {
            prices: true
        },
    });
    if (!allSubscriptionPackages || allSubscriptionPackages.length === 0)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'no_active_subscription_packages_found.', });

    return allSubscriptionPackages;

}