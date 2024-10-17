function isWithinDateRange(date: Date, startDate: Date, daysRange: number) {

    const lowerLimit = new Date(startDate);
    const upperLimit = new Date(startDate);
    lowerLimit.setDate(startDate.getDate() - daysRange);
    upperLimit.setDate(startDate.getDate() + daysRange);

    return date >= lowerLimit && date <= upperLimit;
}

export default isWithinDateRange;
