import React, { useState } from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { UsersCourse, UsersPurchase } from '../../../../types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  course: UsersPurchase;
}

const coursesRowTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter, sans-serif',
          background: 'transparent',
          color: 'black',
        },
      },
    },
  },
});

const ModuleRow: React.FC<Props> = ({ course }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <ThemeProvider theme={coursesRowTheme}>
      <TableRow sx={{ '& > *': { borderTop: '2px solid #4688C1', color: '#444444' } }}>
        <TableCell component="th" scope="row" align="center">
          {course.category}
        </TableCell>
        <TableCell align="center">{course.title}</TableCell>
        <TableCell align="center">{course.tutor.firstName + ' ' + course.tutor.lastName}</TableCell>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table aria-label="purchases" sx={{ backgroundColor: 'white' }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Module Number</TableCell>
                    <TableCell align="center">Module Title</TableCell>
                    <TableCell align="center">Lessons</TableCell>
                    <TableCell align="center">Navigate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {course.modules.map((module) => (
                    <TableRow key={module.id}>
                      <TableCell component="th" scope="row" align="center">
                        {module.number}
                      </TableCell>
                      <TableCell align="center">{module.title}</TableCell>
                      <TableCell align="center">{module.numberOfLessons}</TableCell>
                      <TableCell align="center">
                        <IconButton aria-label="expand row" size="small">
                          <Link href={`/my-courses/modules/${module.id}`}>
                            <KeyboardArrowRightIcon />
                          </Link>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </ThemeProvider>
  );
};

export default ModuleRow;
