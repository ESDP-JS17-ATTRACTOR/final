import React, { PropsWithChildren, useEffect } from 'react';
import SideBar from '@/components/UI/Admin/SideBar';
import { Box, Container, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/features/users/usersSlice';
import { useRouter } from 'next/router';

const Admin: React.FC<PropsWithChildren> = ({ children }) => {
  const mdTheme = createTheme();
  const user = useAppSelector(selectUser);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role !== 'admin' && user.role !== 'moderator') {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [user, router]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        {children ? (
          <>
            <SideBar />
            <Box
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Container sx={{ mt: 4, mb: 4, pt: 6 }}>{children}</Container>
            </Box>
          </>
        ) : (
          <Typography>Добро пожаловать в меню администратора!</Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Admin;
