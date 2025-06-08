import HttpStatusCode from 'enums/httpstatuscode';
import { HTTPException } from 'hono/http-exception';

import pc from '../../helpers/prismaclient.singleton';

enum Duration {
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY',
    LIFETIME = 'LIFETIME'
}

enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    TRY = 'TRY'
}

interface Price {
    currency: Currency;
    amount: number;
}

interface PackageFeature {
    feature: string;
    available?: boolean;
}

interface CreatePackageInput {
    name: string;
    description: string;
    icon: string;
    duration: Duration;
    popular?: boolean;
    highlightColor?: string;
    savings?: string;
    features: PackageFeature[];
    prices: Price[];
}

export const createSubscriptionPackage = async ({
    name,
    description,
    icon,
    duration,
    popular = false,
    highlightColor,
    savings,
    features,
    prices
}: CreatePackageInput) => {

    const isDuplicatePackageName = await pc.packages.findFirstOrThrow({
        where: { name: name },
    })

    if (isDuplicatePackageName)
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'package_name_already_exists' });

    const newPackage = await pc.packages.create({
        data: {
            name,
            description,
            icon,
            duration,
            popular,
            highlightColor,
            savings,
            features: {
                create: features.map(feature => ({
                    feature: feature.feature,
                    available: feature.available ?? true
                }))
            },
            prices: {
                create: prices.map(price => ({
                    currency: price.currency,
                    amount: price.amount
                }))
            }
        },
    });

    if (!newPackage)
        throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, { message: 'failed_to_create_subscription_package' });

    return newPackage;
}
