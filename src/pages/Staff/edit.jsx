import { Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";
// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import http from "../../http";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingComponent } from "../../components";
// import http from "../../http";

export const Edit = () => {
  //   const user = useSelector((state) => state.user.value);
  const [staff, setStaff] = useState({});

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

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
        .patch(`/cms/staffs/${id}`, data)
        .then(() => navigate("/staff"))
        .catch()
        .finally(() => setSubmitting(false));
    },
  });

  useEffect(() => {
    setLoading(true);
    http
      .get(`/cms/staffs/${id}`)
      .then(({ data }) => {
        // formik.setFieldValue();
        setStaff(data);
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (Object.keys(staff).length > 0) {
      for (let k in formik.values) {
        formik.setFieldValue(k, staff[k]);
      }
    }
    // console.log(staff);
  }, [staff]);

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
                  <h1>Edit Staffs</h1>
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
                    {/* <InputField
                  type="password"
                  label="Password"
                  name="password"
                  formik={formik}
                /> */}
                    {/* <InputField
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  formik={formik}
                /> */}
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
                    <SubmitBtn formik={formik} label="Edit" />
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
