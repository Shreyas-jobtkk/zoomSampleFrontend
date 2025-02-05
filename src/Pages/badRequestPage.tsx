import React from "react";
import { Box, Typography, Button } from "@mui/material";

const BadRequestPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="background.default"
      textAlign="center"
    >
      <Typography variant="h1" color="error" fontWeight="bold">
        400
      </Typography>
      <Typography variant="h4" color="textPrimary" mt={2}>
        Bad Request
      </Typography>
      <Typography variant="body1" color="textSecondary" mt={1}>
        The server could not understand the request due to invalid syntax.
      </Typography>
      <Button variant="contained" color="primary" href="/" sx={{ mt: 3 }}>
        Go Home
      </Button>
    </Box>
  );
};

export default BadRequestPage;
