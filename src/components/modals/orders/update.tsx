import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useOrderStore, useServiceStore } from "@store";
import { orderUpdate } from "@validation";
import {
  postData,
  initialValues as InitialValuesType,
} from "@orders-interface";
import edit from "../../../assets/edit.svg";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UpdateOrder({ propsData }: any) {
  const { updateData } = useOrderStore();
  const { getServicesData, servicesData } = useServiceStore();

  const params: any = { page: 1, limit: 10 };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    getServicesData(params);
  };
  const handleClose = () => setOpen(false);

  const initialValues: InitialValuesType = {
    service_id: propsData?.service_id,
    amount: propsData?.amount,
    status: propsData?.status,
  };

  const handleSubmit = async (values: InitialValuesType) => {
    const payload: postData = {
      ...values,
      id: propsData.id,
      service_id: values.service_id,
      client_id: propsData.client_id,
    };
    const status = await updateData(payload);
    if (status === 200) {
      handleClose();
    }
    console.log(payload);
  };

  return (
    <div>
      <button onClick={handleOpen}>
        <img src={edit} alt="edit" />
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
            validationSchema={orderUpdate}
            onSubmit={handleSubmit}
          >
            <Form className="max-w-[600px] w-full flex flex-col gap-[12px]">
              <Typography
                id="modal-modal-title"
                className="text-center"
                variant="h6"
                component="h2"
              >
                Buyurtmani Tahrirlash
              </Typography>

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
                name="status"
                type="text"
                as={Select}
                label="Xizmat turi"
                fullWidth
                margin="normal"
                variant="outlined"
                helperText={
                  <ErrorMessage
                    name="status"
                    component="p"
                    className="text-[red] text-[15px]"
                  />
                }
              >
                <MenuItem value="in_process">in_process</MenuItem>
                <MenuItem value="done">done</MenuItem>
                <MenuItem value="taken">taken</MenuItem>
              </Field>

              <Field
                as={TextField}
                label="Miqdori"
                sx={{ "& input": { color: "#000", fontSize: "20px" } }}
                type="number"
                name="amount"
              />
              <ErrorMessage name="amount" component="p" />
              <Button
                sx={{ fontSize: "16px", fontWeight: "600" }}
                variant="contained"
                type="submit"
              >
                Tahrirlash
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
