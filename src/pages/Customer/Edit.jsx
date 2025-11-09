import { useFormik } from "formik";
import { Col, Container, Row, Form } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useEffect, useState } from "react";
import http from "../../http";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { LoadingComponent } from "../../components";
import { BackendvalidationError } from "../../library";

const Edit = () => {
  const { id } = useParams();

  const [customer, setCustomer] = useState({});

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required(),
      phone: Yup.string().required(),
      address: Yup.string().required(),
      status: Yup.boolean().required(),
    }),
    onSubmit: (data, { setSubmitting }) => {
      http
        .patch(`/cms/customers/${id}`, data)
        .then(() => navigate("/customer"))
        .catch()
        .finally(() => setSubmitting(false));
    },
  });

  useEffect(() => {
    setLoading(true);
    http
      .get(`/cms/customers/${id}`)
      .then(({ data }) => setCustomer(data))
      .catch(({ response }) => BackendvalidationError(formik, response))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (Object.keys(customer).length > 0) {
      for (let k in formik.values) {
        formik.setFieldValue(k, customer[k]);
      }
    }
    // console.log(staff);
  }, [customer]);

  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <Row>
                <Col>
                  <h1>Welcome to Edit </h1>
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
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Edit;
