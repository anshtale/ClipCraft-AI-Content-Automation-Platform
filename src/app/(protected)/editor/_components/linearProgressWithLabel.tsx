import { Box, LinearProgress, Typography, type LinearProgressProps } from '@mui/material';
import React from 'react'

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <span className='text-gray-300 text-sm'>{`${Math.round(props.value)}%`}</span>
        </Box>
      </Box>
    );
  }

export default LinearProgressWithLabel