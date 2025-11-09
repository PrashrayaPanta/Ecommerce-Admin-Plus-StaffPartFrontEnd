import { Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import http from "../../http";
import { useNavigate } from "react-router-dom";
import { BackendvalidationError } from "../../library";

YupPassword(Yup); // extend yup

export const Create = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phoneno: "",
      address: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .minLowercase(1)
        .minSymbols(1)
        .minUppercase(1),
      phoneno: Yup.string().required(),
      address: Yup.string().required(),
    }),
    onSubmit: (data, { setSubmitting }) => {
      console.log(data);

      // console.log(data);
      // console.log("Hello");

      http
        .post("/api/admin/staffs", data)
        .then(() => navigate("/staff"))
        .catch(({ response }) => BackendvalidationError(formik, response))
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <>
      <Container className="bg-white">
        <Row>
          <Col
            sm="12"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            <Row>
              <Col className="text-center">
                <h1>Add Staffs</h1>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form onSubmit={formik.handleSubmit}>
                  <InputField
                    label="Username"
                    name="username"
                    formik={formik}
                    type="text"
                  />
                  <InputField
                    type="text"
                    label="Email"
                    name="email"
                    formik={formik}
                  />
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                    formik={formik}
                  />

                  <InputField
                    type="text"
                    label="PhoneNo"
                    name="phoneno"
                    formik={formik}
                  />
                  <InputField
                    type="text"
                    label="Address"
                    name="address"
                    formik={formik}
                  />
                  <SubmitBtn formik={formik} label="Create" />
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
