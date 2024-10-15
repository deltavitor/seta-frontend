function parseDate(dateStr: string): Date | undefined {
    const [day, month, year] = dateStr.split("/").map(Number);
    if (!day || !month || !year) return undefined;
    return new Date(year, month - 1, day);
}

export default parseDate;
