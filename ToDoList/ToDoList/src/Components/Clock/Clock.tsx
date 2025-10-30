import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

const Clock: React.FC = ({ }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 500);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <Box sx={{ textAlign: 'center', p: 0 ,color: "var(--text-color-wite)"}} >
        {timeString}
    </Box>
  );
};

export default Clock;