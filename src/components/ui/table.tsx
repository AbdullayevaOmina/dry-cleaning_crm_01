import {
  Skeleton,
  Paper,
  TableSortLabel,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  TableCell,
  Table,
  Box,
} from "@mui/material";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import del from "../../assets/delete.svg";
import { TableProps } from "@global-interface";
import { useState } from "react";
import ConfirmationModal from "../modals/global/ConfirmationModal";
import { toast } from "react-toastify";
import { UpdateOrder } from "@modals";

const GlobalTable = (props: TableProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(props.body);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };
  const confirmDelete = () => {
    if (selectedId) {
      const updatedBody = data.filter((item) => item.id !== selectedId);
      props.deleteAction(selectedId);
      setData(updatedBody);
      setModalOpen(false);
      toast.success("Item deleted successfully");
      setSelectedId(null);
    }
  };

  const handleStatusChange = async (
    id: string,
    newStatus: `in_process` | `done` | `taken`
  ) => {
    if (props.handleStatus) {
      const d = {
        order_id: id,
        status: newStatus,
      };
      const res = await props.handleStatus(d);
      if (res === 200) {
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        );
        setData(updatedData);
      } else {
        toast.error("Failed to update status");
        console.error("Error:", res);
      }
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                {props.headers?.map((header, index) => (
                  <TableCell key={index}>
                    <TableSortLabel>{header.title}</TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.isLoading
                ? Array.from(new Array(5)).map((_, index) => (
                    <TableRow key={index}>
                      {props.headers?.map((_, i) => (
                        <TableCell key={i}>
                          <Skeleton />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : data?.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        {props.headers?.map((header, i) => (
                          <TableCell
                            key={i}
                            className={item[header.value]?.class}
                          >
                            {header.title === "Action" ? (
                              <div className="flex gap-3 cursor-pointer items-center">
                                <img
                                  src={del}
                                  alt="delete"
                                  onClick={() => handleDelete(item.id)}
                                />
                                <UpdateOrder propsData={item} />
                              </div>
                            ) : header.title === "Date" ? (
                              item[header.value].slice(0, 10)
                            ) : header.title === "Holati" ? (
                              <Select
                                value={item[header.value]}
                                onChange={(e, newValue) =>
                                  handleStatusChange(item.id, newValue)
                                }
                                color={
                                  item[header.value] === "in_process"
                                    ? "danger"
                                    : item[header.value] === "done"
                                    ? "success"
                                    : "primary"
                                }
                                size="sm"
                                variant="soft"
                                defaultValue={item[header.value]}
                              >
                                <Option value="in_process">in_process</Option>
                                <Option value="done">done</Option>
                                <Option value="taken">taken</Option>
                              </Select>
                            ) : header.title === "№" ? (
                              index + 1
                            ) : (
                              item[header.value]
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
          <ConfirmationModal
            open={modalOpen}
            message="Are you sure you want to delete this item?"
            onClose={() => setModalOpen(false)}
            onConfirm={confirmDelete}
          />
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default GlobalTable;
