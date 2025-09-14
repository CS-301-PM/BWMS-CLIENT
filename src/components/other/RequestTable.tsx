import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppButton from "./AppButton";
import Box from "@mui/material/Box";
import { useUserContext } from "../../hooks/UserContextHook";
import {
  priorityOptions,
  PriorityType,
  statusOptions,
  StatusType,
} from "../../types/Request";
import BasicSelect from "./BasicSelector";

type RowData = {
  id: string;
  requestId: number;
  item: string;
  quantity: number;
  status: StatusType;
  department: string;
  priority: PriorityType;
};

function createData(
  id: string,
  requestId: number,
  item: string,
  quantity: number,
  status: StatusType,
  department: string,
  priority: PriorityType
): RowData {
  return { id, requestId, item, quantity, status, department, priority };
}

const initialRows: RowData[] = [
  createData("12345", 12345, "A4 Books", 50, "approved", "Finance", "High"),
  createData("12346", 12346, "Pens", 100, "pending", "HR", "Low"),
  createData("12347", 12347, "Notebooks", 30, "in progress", "IT", "Medium"),
  createData("12348", 12348, "Markers", 20, "rejected", "Finance", "Medium"),
  createData("12349", 12349, "Staplers", 15, "approved", "Admin", "Low"),
  createData("12350", 12350, "Folders", 40, "pending", "HR", "High"),
  createData(
    "12351",
    12351,
    "Calculator",
    10,
    "approved",
    "Accounting",
    "Medium"
  ),
];

export default function EnhancedTable() {
  const { user } = useUserContext();

  const [rows, setRows] = React.useState<RowData[]>(initialRows);
  const [filterStatus, setFilterStatus] = React.useState<StatusType | "All">(
    "All"
  );
  const [filterPriority, setFilterPriority] = React.useState<
    PriorityType | "All"
  >("All");
  const [sortAsc, setSortAsc] = React.useState<boolean>(true);

  // const priorityWeight: Record<PriorityType, number> = {
  //   Low: 1,
  //   Medium: 2,
  //   High: 3,
  // };

  const filteredRows = rows.filter(
    (row) =>
      (filterStatus === "All" ? true : row.status === filterStatus) &&
      (filterPriority === "All" ? true : row.priority === filterPriority)
  );

  const sortedRows = [...filteredRows].sort((a, b) =>
    sortAsc ? a.requestId - b.requestId : b.requestId - a.requestId
  );

  const handleStatusChange = (request: RowData) => {
    alert(`Status clicked for ${request.item}`);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <BasicSelect
          label="Filter by Status"
          value={filterStatus}
          options={[{ value: "All", label: "All Statuses" }, ...statusOptions]}
          onChange={(value) => setFilterStatus(value as StatusType | "All")}
        />

        <BasicSelect
          label="Filter by Priority"
          value={filterPriority}
          options={[
            { value: "All", label: "All Priorities" },
            ...priorityOptions,
          ]}
          onChange={(value) => setFilterPriority(value as PriorityType | "All")}
        />

        <AppButton
          variant="outlined"
          color="info"
          onClick={() => setSortAsc((prev) => !prev)}
        >
          Sort by Request ID {sortAsc ? "↑" : "↓"}
        </AppButton>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="enhanced table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>ID</TableCell>
              <TableCell align="left">Request ID</TableCell>
              <TableCell align="left">Item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="left">Department</TableCell>
              <TableCell align="left">Priority</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
                  "&:hover": { backgroundColor: "#e3f2fd" },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.requestId}</TableCell>
                <TableCell align="left">{row.item}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="left">{row.department}</TableCell>
                <TableCell align="left">{row.priority}</TableCell>
                <TableCell align="left">
                  {(user?.user?.role === "department_staff" ||
                    user?.user?.role === "storekeeper") && (
                    <AppButton
                      onClick={() => handleStatusChange(row)}
                      variant="contained"
                      color={
                        row.status === "pending"
                          ? "primary"
                          : row.status === "approved"
                          ? "success"
                          : row.status === "rejected"
                          ? "error"
                          : "inherit"
                      }
                    >
                      {row.status}
                    </AppButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
