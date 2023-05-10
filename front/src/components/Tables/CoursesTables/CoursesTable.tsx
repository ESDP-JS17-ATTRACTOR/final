import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { UsersPurchase } from "../../../../types";
import ModuleRow from "@/components/Tables/CoursesTables/ModuleRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface Props {
  courses: UsersPurchase[];
}

const coursesTableTheme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "Inter, sans-serif",
          background: "transparent",
          color: "#334169",
        },
      },
    },
  },
});

const CoursesTable: React.FC<Props> = ({courses}) => {
  return (
      <ThemeProvider theme={coursesTableTheme}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Tutor</TableCell>
                <TableCell align="center">Modules</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{backgroundColor: "#EFE7C4"}}>
              {courses.map((course) => (
                <ModuleRow key={course.id} course={course} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
  );
};

export default CoursesTable;