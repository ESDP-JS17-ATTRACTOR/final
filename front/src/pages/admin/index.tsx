import React, { PropsWithChildren } from "react";
import SideBar from "@/components/UI/SideBar";
import { Box, Container, Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Admin: React.FC<PropsWithChildren> = ({ children }) => {
  const mdTheme = createTheme();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>

        {children && (
          <>
            <SideBar />
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4, pt: 6 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper>
                      {children}
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Admin;