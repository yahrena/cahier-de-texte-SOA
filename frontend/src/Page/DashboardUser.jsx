import React from 'react'
import SideBarEleve from '../Component/SideBarEleve'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function DashboardUser() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBarEleve />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
        
        <Typography variant='h4'>
            Welcome to Dashboard User
        </Typography>
        <Typography paragraph>
          Allo
        </Typography>
      </Box>
    </Box>
  )
}
