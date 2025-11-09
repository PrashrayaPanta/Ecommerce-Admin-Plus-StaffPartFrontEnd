import { useFormik } from "formik";
import { Col, Container, Form, Row } from "react-bootstrap";

import * as Yup from "yup";
import { InputField, SubmitBtn } from "../../components";

import YupPassword from "yup-password";
import http from "../../http";
import { BackendvalidationError } from "../../library";
import { useEffect } from "react";

YupPassword(Yup);

export const Password = () => {
  //   const user = useSelector((state) => state.user.value);
  //   const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Password";
  }, []);
  const formik = useFormik({
    initialValues: {
      OldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      OldPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .minLowercase(1)
        .minSymbols(1)
        .minUppercase(1),
    }),
    onSubmit: (data, { setSubmitting }) => {
      http
        .put("api/users/profile/password", data)
        .then()
        .catch(({ response }) => {
          BackendvalidationError(formik, response);
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <Container className="bg-white shadow-sm py-3 my-3">
      <Col lg="4" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
        <Row>
          <Col>
            <h1>Change Password</h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              <InputField
                label="Old Password"
                name="OldPassword"
                formik={formik}
                type="text"
              />
              <InputField
                type="text"
                label="New Password"
                name="newPassword"
                formik={formik}
              />

              <SubmitBtn formik={formik} label="Save" icon="fa fa-edit" />
              {/* <SubmitBtn formik={formik} label="Add" icon="fa fa-plus" /> */}
            </Form>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};
