import { useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useServiceStore } from "@store";
import { serviceValidationSchema } from "@validation";
import { postData, initialValues } from "@services-interface";
import edit from "../../../assets/edit.svg";
import { style } from "@ui";
import { toast } from "react-toastify";

const UpdateService = (propsData: any) => {
  const data = propsData.propsData;
  const { updateData } = useServiceStore();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const initialValues: initialValues = {
    name: data.name,
    price: data.price,
  };

  const handleSubmit = async (value: initialValues, { setSubmitting }: any) => {
    const payload: postData = { ...value, id: data.id };
    try {
      const status = await updateData(payload);
      if (status === 200) {
        handleClose();
        toast.success("Successfully updated!");
        setSubmitting(false);
      } else {
        toast.error("Error occurred while updating!");
        setSubmitting(false);
      }
    } catch (error) {
      handleClose();
      console.error("Update error:", error);
      toast.error("Error occurred while updating!");
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button onClick={handleOpen}>
        <img src={edit} alt="Edit" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={serviceValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="grid gap-5">
                <Typography
                  id="modal-modal-title"
                  className="text-center"
                  variant="h6"
                  component="h2"
                >
                  Edit Service
                </Typography>
                <Field
                  as={TextField}
                  label="Service Name"
                  placeholder="Service Name"
                  type="text"
                  name="name"
                  fullWidth
                />
                <ErrorMessage
                  name="name"
                  component="small"
                  className="text-rose-600"
                />
                <Field
                  as={TextField}
                  label="Service Price"
                  placeholder="Service Price"
                  type="number"
                  name="price"
                  fullWidth
                />
                <ErrorMessage
                  name="price"
                  component="small"
                  className="text-rose-600"
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateService;
