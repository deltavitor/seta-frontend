function parseDate(dateStr: string): Date | undefined {
    const [day, month, year] = dateStr.split("/").map(Number);
    if (!day || !month || !year) return undefined;
    if (month < 1 || month > 12) return undefined;
    if (day < 1 || day > 31) return undefined;
    return new Date(year, month - 1, day);
}

export default parseDate;
