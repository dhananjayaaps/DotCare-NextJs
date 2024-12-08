const calculatePOG = (edd) => {
    const today = new Date();
    const eddDate = new Date(edd);

    // Difference in time between today and the EDD
    const diffInTime = eddDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));

    // Full-term pregnancy is considered 40 weeks (280 days)
    const totalGestationDays = 280;

    // Calculate POG in days
    const pogDays = totalGestationDays - diffInDays;

    // Convert POG to weeks and days
    const pogWeeks = Math.floor(pogDays / 7);
    const pogRemainingDays = pogDays % 7;

    // Return result in "weeks + days" format
    return pogWeeks >= 0
        ? `${pogWeeks}+${pogRemainingDays}`
        : `0+0 (Pre-conception or invalid date)`;
};

export default calculatePOG;