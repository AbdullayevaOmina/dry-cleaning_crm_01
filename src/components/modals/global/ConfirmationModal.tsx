import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ConfirmationModalProps } from "@global-interface";
import { style } from "@ui";
style.width = 500;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  message,
  btnTitle,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {message}
        </Typography>
        <div className="flex gap-4 w-full justify-end mt-8">
          <Button variant="contained" color="info" onClick={onClose}>
            Yo'q
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            {btnTitle}
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
