import React from 'react'
import SideBar from '../../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function NiveauM1() {
  return (
        <Box sx={{display:'flex'}}>
          <SideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
            <Typography variant="h5">
             Niveau M1
            </Typography>
          </Box>
        </Box>
  )
}
