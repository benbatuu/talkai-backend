export const calculateEndDate = (duration: string): Date => {
    const now = new Date();
    switch (duration) {
        case 'MONTHLY':
            return new Date(now.setMonth(now.getMonth() + 1));
        case 'YEARLY':
            return new Date(now.setFullYear(now.getFullYear() + 1));
        case 'LIFETIME':
            return new Date(now.setFullYear(now.getFullYear() + 100)); // Set far future date for lifetime
        default:
            throw new Error('Invalid duration');
    }
};
