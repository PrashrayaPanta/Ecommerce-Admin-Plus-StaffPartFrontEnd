import dayjs from "dayjs";

import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);

export const BackendvalidationError = (formik, response) => {
  // console.log(response);
  // console.log("I am inside backend validatiion error");
  // console.log(response?.data);
  // if ("message" in response?.data) {
  //   formik.setFieldError("email", response?.data?.message);
  // }
  // if ("stack" in response.data) {
  //   console.log(response.data.stack);
  // if("Error" in response.data.stack){
  //   formik.setFieldError("email", response.data.stack.Error);
  // }
  // for (let k in response.data.errors) {
  //   formik.setFieldError(k, response.data.errors[k]);
  // }
  // }
};

export const ToStorage = (key, value, remember = false) => {
  remember
    ? localStorage.setItem(key, value)
    : sessionStorage.setItem(key, value);
};

export const FromStorage = (key) => {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
};

export const ClearStorage = (key) => {
  localStorage.clear(key);
  sessionStorage.clear(key);
};

export const dtFormat = (dt, format = "lll") => dayjs(dt).format(format);

export const imgURLForBrand = (public_id) => {
  return `${import.meta.env.VITE_API_URL}/api/brands/${public_id}`;
};

export const imgURLForProduct = (public_id) => {
  console.log(public_id);

  // console.log(import.meta.VITE_API_URL);

  // console.log(`${import.meta.VITE_API_URL}`)

  return `${import.meta.env.VITE_API_URL}/api/products/${public_id}`;
};
