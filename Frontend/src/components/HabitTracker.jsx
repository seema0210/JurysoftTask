import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RestartAlt as ResetIcon
} from '@mui/icons-material';
import { markHabitDone, resetHabit, getHabits } from '../HandleApi/HandleApi';

const HabitTracker = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [habitData, setHabitData] = useState({ 
    name: 'Drink Water', 
    dates: [],
    streak: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHabits();
  }, []);

  useEffect(() => {
    calculateStreak();
  }, [habitData.dates]);

  const loadHabits = async () => {
    try {
      const data = await getHabits();
      if (data && data.length > 0) {
        const habit = data.find(h => h.name === 'Drink Water') || { name: 'Drink Water', dates: [] };
        setHabitData({
          ...habitData,
          dates: habit.dates || []
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading habits:', error);
      setLoading(false);
    }
  };

  const handleMarkDone = async () => {
    try {
      const data = await markHabitDone();
      if (data && data.habits) {
        const habit = data.habits.find(h => h.name === 'Drink Water') || { name: 'Drink Water', dates: [] };
        setHabitData({
          ...habitData,
          dates: habit.dates
        });
      }
    } catch (error) {
      console.error('Error marking habit:', error);
    }
  };

  const handleReset = async () => {
    try {
      const data = await resetHabit();
      if (data && data.habits) {
        setHabitData({
          ...habitData,
          dates: []
        });
      }
    } catch (error) {
      console.error('Error resetting habit:', error);
    }
  };

  const calculateStreak = () => {
    if (habitData.dates.length === 0) {
      setHabitData(prev => ({ ...prev, streak: 0 }));
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let currentStreak = 0;
    let checkDate = new Date(today);
    
    // Check consecutive days from today backwards
    for (let i = 0; i < 7; i++) {
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (habitData.dates.includes(dateStr)) {
        currentStreak++;
      } else if (checkDate.getTime() < today.getTime()) {
        // If we found a gap in the past, break the streak
        break;
      }
      
      // Move to previous day
      checkDate.setDate(checkDate.getDate() - 1);
    }
    
    setHabitData(prev => ({ ...prev, streak: currentStreak }));
  };

  const getLast7Days = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      days.push({
        date: dateStr,
        day: dayName,
        done: habitData.dates.includes(dateStr)
      });
    }
    
    return days;
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        }}
      >
        <Typography variant="h6" color="white">
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: isMobile ? 1 : 3,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: isMobile ? '100%' : '70%',
          borderRadius: 2,
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #2d2d2d 0%, #1f1f1f 100%)'
        }}
      >
        <Box
          sx={{
            p: 3,
            bgcolor: 'primary.dark',
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Tiny Habit Logger
          </Typography>
          <Typography variant="h6" color="secondary.main">
            {habitData.name}
          </Typography>
        </Box>

        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h3" color="primary.main" gutterBottom>
            {habitData.streak} day streak
          </Typography>
          
          <Box sx={{ mt: 3, mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<CheckCircleIcon />}
              onClick={handleMarkDone}
              sx={{ mr: 2, mb: isMobile ? 2 : 0 }}
            >
              Mark Done Today
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<ResetIcon />}
              onClick={handleReset}
            >
              Reset Habit
            </Button>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, color: 'white' }}>
            Last 7 Days
          </Typography>
          
          <Grid container spacing={2} justifyContent="center">
            {getLast7Days().map((day, index) => (
              <Grid item key={index} xs={6} sm={3} md={2}>
                <Card 
                  sx={{ 
                    bgcolor: day.done ? 'success.main' : 'grey.800',
                    color: 'white',
                    textAlign: 'center'
                  }}
                >
                  <CardContent>
                    <Typography variant="body2" gutterBottom>
                      {day.day}
                    </Typography>
                    <Typography variant="h6">
                      {day.done ? '✓' : '✗'}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default HabitTracker;