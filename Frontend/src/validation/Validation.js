export const validateHabit = (habitData) => {
  if (!habitData.name || habitData.name.trim() === '') {
    return 'Habit name is required';
  }
  return null;
};