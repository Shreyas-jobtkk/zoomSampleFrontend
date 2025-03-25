import React from "react";
import { Box, Typography, Button } from "@mui/material";

const BadRequestPage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h1" color="error" fontWeight="bold">
        400
      </Typography>
      <Typography variant="h4" color="textPrimary" mt={2}>
        不正なリクエスト
      </Typography>
      <Typography variant="body1" color="textSecondary" mt={1}>
        サーバーはリクエストを理解できませんでした（無効な構文）
      </Typography>
      <Button variant="contained" color="primary" href="/" sx={{ mt: 3 }}>
        ホームへ戻る
      </Button>
    </Box>
  );
};

export default BadRequestPage;
