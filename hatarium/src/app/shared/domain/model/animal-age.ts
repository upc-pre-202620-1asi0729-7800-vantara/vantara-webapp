/** Inventory age group: calves are animals younger than six calendar months. */
export function isCalf(birthDate: string | undefined, today = new Date()): boolean {
  if (!birthDate) return false;
  const birth = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(birth.getTime()) || birth > today) return false;
  const sixMonthsOld = new Date(birth);
  sixMonthsOld.setMonth(sixMonthsOld.getMonth() + 6);
  return today < sixMonthsOld;
}
