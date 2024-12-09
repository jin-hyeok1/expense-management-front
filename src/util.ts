export const getExpenseDate = (target: string) => {
    const [year, month, date] = target.split('T')[0].split('-').map(e => parseInt(e));
    return new Date(year, month, date);
}