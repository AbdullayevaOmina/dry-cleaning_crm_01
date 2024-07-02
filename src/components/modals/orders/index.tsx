import { ErrorMessage, Field, Form, Formik } from "formik";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { ModalProps } from "@global-interface";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { createOrderValidationSchema } from "@validation";
import { CreateOrder } from "@orders-interface";
import { useOrderStore, useServiceStore } from "@store";
import { useEffect } from "react";
import { style } from "@ui";

const Index = ({ open, handleClose }: ModalProps) => {
  const { createData } = useOrderStore();
  const { getServicesData, servicesData } = useServiceStore();
  const params: any = { page: 1, limit: 10 };

  useEffect(() => {
    getServicesData(params);
  }, []);

  const initialValues: CreateOrder = {
    client_full_name: "",
    client_phone_number: "",
    service_id: "",
    amount: "",
  };
  const handleSubmit = async (values: CreateOrder) => {
    const status = await createData(values);
    if (status === 201) handleClose();
  };
  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="keep-mounted-modal-title"
          className="text-center"
          variant="h6"
          component="h2"
        >
          Buyurtmala Qos'hish
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={createOrderValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="client_full_name"
                type="text"
                as={TextField}
                label="Mijoz ismini kiriting"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="client_full_name"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="client_phone_number"
                type="tel"
                as={TextField}
                label="Mijoz telefon raqami"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="client_phone_number"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Field
                name="service_id"
                type="text"
                as={Select}
                label="Xizmat turi"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="service_id"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              >
                {servicesData.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    {item.name}
                  </MenuItem>
                ))}
              </Field>
              <Field
                name="amount"
                type="number"
                as={TextField}
                label="Miqdorini kiriting"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="amount"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                fullWidth
              >
                {isSubmitting ? "Submitting" : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default Index;
