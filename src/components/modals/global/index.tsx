import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const action = { value: false };

function MessageModal({
  message,
  btnTitle,
  onActionChange,
  title,
}: {
  message: string;
  btnTitle: string;
  onActionChange: (newAction: boolean) => void;
  title: any;
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleCloseP = () => {
    onActionChange(false);
    setOpen(false);
  };

  const handleCloseM = () => {
    onActionChange(true);
    setOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>{title}</button>
      <Modal
        open={open}
        onClose={handleCloseP}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
          <div className="flex gap-4 w-full justify-end mt-8">
            <Button variant="contained" color="info" onClick={handleCloseP}>
              Close
            </Button>
            <Button variant="contained" color="error" onClick={handleCloseM}>
              {btnTitle}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export { MessageModal, action };
