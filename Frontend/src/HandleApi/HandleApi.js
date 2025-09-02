import { toast } from 'react-toastify';


export const getHabits = async () => {
  try {
    const response = await fetch(`http://localhost:3001/habits`);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log('Error fetching habits:', error);
    toast.error('Failed to fetch habits');
    throw error;
  }
};

export const markHabitDone = async () => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const response = await fetch(`http://localhost:3001/markHabitDone`, {
      method: "POST",
      body: JSON.stringify({ 
        date: today, 
        habitName: 'Drink Water' 
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
    
    const res = await response.json();
    console.log('Marked habit done:', res);
    toast.success(res.message || "Habit marked as done for today!");
    return res;
  } catch (error) {
    console.log('Error marking habit:', error);
    toast.error('Failed to mark habit as done');
    throw error;
  }
};

export const resetHabit = async () => {
  try {
    const response = await fetch(`http://localhost:3001/resetHabit`, {
      method: "POST",
      body: JSON.stringify({ habitName: 'Drink Water' }),
      headers: {
        "Content-type": "application/json"
      }
    });
    
    const res = await response.json();
    console.log('Reset habit:', res);
    toast.success(res.message || "Habit data reset successfully!");
    return res;
  } catch (error) {
    console.log('Error resetting habit:', error);
    toast.error('Failed to reset habit data');
    throw error;
  }
};