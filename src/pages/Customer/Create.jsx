import { Col, Container, Row, Form } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";

import { useFormik } from "formik";
import YupPassword from "yup-password";
import * as Yup from "yup";
import http from "../../http";
import { useNavigate } from "react-router-dom";
import { BackendvalidationError } from "../../library";

YupPassword(Yup);

export const Create = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().minLowercase(1).minUppercase(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Must match with Password"),

      phone: Yup.string().minNumbers(10),
      address: Yup.string().required(),
      status: Yup.boolean().required(),
    }),
    onSubmit: (data, { setSubmitting }) => {
      http
        .post("/cms/customers", data)
        .then(({ data }) => navigate("/customer"))
        .catch(({ response }) => BackendvalidationError(formik, response))
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          <Row>
            <Col>
              <h1> Create Customer </h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={formik.handleSubmit}>
                <InputField
                  label="Name"
                  name="name"
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
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  formik={formik}
                />
                <InputField
                  type="text"
                  label="PhoneNo"
                  name="phone"
                  formik={formik}
                />
                <InputField
                  type="text"
                  label="Address"
                  name="address"
                  formik={formik}
                />
                <div className="mb-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    id="status"
                    value={formik.values.status}
                    isValid={formik.values.status && !formik.errors.status}
                    isInvalid={formik.touched.email && formik.errors.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value={true}>Active</option>
                    <option value={false}>Inactive</option>
                  </Form.Select>
                  {formik.errors.status && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.status}
                    </Form.Control.Feedback>
                  )}
                </div>
                <SubmitBtn formik={formik} label="Create" />
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
