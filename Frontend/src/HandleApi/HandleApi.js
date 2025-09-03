export const getHabits = async () => {
  try {
    const response = await fetch(`http://localhost:3001/`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const res = await response.json();
    return res;
  } catch (error) {
    console.log('Error fetching habits:', error);
    toast.error('Failed to fetch habits');
    throw error;
  }
};

export const markHabitDone = async () => {
  try {
    const response = await fetch(`http://localhost:3001/create`, {
      method: 'POST'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.log('Error marking habit done:', error);
    toast.error('Failed to mark habit as done');
    throw error;
  }
};

export const resetHabit = async () => {
    let id = 4
  try {
    const response = await fetch(`http://localhost:3001/create/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.log('Error resetting habit:', error);
    toast.error('Failed to reset habit');
    throw error;
  }
};