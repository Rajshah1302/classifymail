"use client";
import { signOut } from "next-auth/react";
import { Avatar, Stack, Button, Box, Typography } from "@mui/material";
function Component({ session }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      className="p-4 border  shadow-lg bg-white"
      justifyContent={"space-between"}
    >
      <Box display="flex" alignItems="center">
        <Avatar alt={session.user.name} src={session.user.image} />
        <Box ml={2}>
          <Typography variant="h6">{session.user.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {session.user.email}
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        ml="auto"
      >
        <button  
          onClick={() => signOut()}
          className="mb-2 rounded-full border  text-black px-4 py-1 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
        >
          Logout
        </button>
        {/* <button 
          className="mt-1 rounded-full border  text-black px-4 py-1 hover:bg-green-500 hover:text-white transition duration-300 ease-in-out"
          >
          Classify
        </button> */}
        
      </Box>
    </Stack>
  );
}

export default Component;
