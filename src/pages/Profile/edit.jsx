import { Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import http from "../../http";
import { setUser } from "../../store";
import * as Yup from "yup";
import { BackendvalidationError } from "../../library";

export const Edit = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      email: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log("jkknkndsjkvnjknkjdnbskj");

      console.log("Hello K xa Thik xa ni");
      console.log(data);

      http
        .put("api/users/profile/edit", data)
        // .then((data) => console.log(data))

        // .then((data) => console.log(data))
        .then((data) => http.get("api/users/profile"))

        .catch(() => {})

        .then(({ data }) => dispatch(setUser(data.user)))

        .catch(({ response }) => {
          BackendvalidationError(formik, response);
        })
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          <Row>
            <Col className="text-center">
              <h1>Change Profile</h1>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form onSubmit={formik.handleSubmit}>
                <InputField
                  label="Name"
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

                <SubmitBtn formik={formik} label="Save" icon="fa fa-edit" />
                {/* <SubmitBtn formik={formik} label="Add" icon="fa fa-plus" /> */}
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
