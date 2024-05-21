import React from "react";
import { NavLink, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { amber, grey } from "@mui/material/colors";

const Nav = () => {
  return (
    <Box display="flex">
      <Box sx={{ flexGrow: 1 }}>
        <Button
          component={NavLink}
          to="/"
          sx={{
            "&.active": {
              margin: 1,
              boxShadow: 3,
              color: grey[900],
              backgroundColor: amber[400],
            },
          }}
          variant="text"
        >
          Post
        </Button>

        <Button 
          component={NavLink}
          to="/draft"
          sx={{
            "&.active": {
              margin: 1,
              boxShadow: 3,
              color: grey[900],
              backgroundColor: amber[400],
            },
          }}
          
          variant="text"
        >
          Draft
        </Button>
      </Box>

      <Box>
        <Link to={`/create`}>
          <Button
            variant="contained"
            style={{ color: grey[900], backgroundColor: amber[700] }}
            sx={{ m: 1, mb: 3 }}
          >
            Create Draft
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Nav;
