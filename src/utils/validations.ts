import * as Yup from "yup";
// --------------------- AUTH ---------------------------
// signin
export const signUpValidationSchema = Yup.object().shape({
  full_name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
  phone_number: Yup.string()
    .min(19, "Invalid phone number")
    .required("Phone is required"),
});

// signup
export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
});

// verify Password
export const verifyPassValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

// update pasword
export const updatePassValidationSchema = Yup.object().shape({
  new_password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      "Password must be at least 6 characters and contain at least one uppercase and one lowercase letter"
    )
    .required("Password is required"),
  code: Yup.string().required().trim(),
});
// --------------------- AUTH ---------------------------

// ---------------------- SERVICE -----------------------
// update
export const serviceValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .min(1, "Price must be greater than 0")
    .required("Price is required"),
});
// ---------------------- SERVICE -----------------------

// ---------------------- ORDERS -----------------------
// create
export const createOrderValidationSchema = Yup.object().shape({
  client_full_name: Yup.string().required("Mijoz ismi kiritilmadi"),
  client_phone_number: Yup.string().required("Phone number is required"),
  service_id: Yup.string().required("Servisni tanlang"),
  amount: Yup.string().required("Miqdorni kiriting"),
});

// update
export const orderUpdate = Yup.object().shape({
  service_id: Yup.string().required("Servisni tanlang"),
  status: Yup.string().required("Status kiritilmadi"),
  amount: Yup.number().required("Miqdorni kiriting"),
});
// ---------------------- ORDERS -----------------------
