import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { useFormik } from "formik";
import * as Yup from "yup";

import http from "../../http";
import { BackendvalidationError, ToStorage } from "../../library";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store";
import { useNavigate } from "react-router-dom";

import { InputField, SubmitBtn } from "../../components";

export const Login = () => {
  const [remember, setRemember] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  // console.log(remember);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      console.log(data);

      //   setTimeout(() => setSubmitting(false), 2000);
      // console.log(setSubmitting);
      //api request
      // https://mern-130.nru.com.np/ is common route in all so make it in other file and call it
      // console.log(response);

      http
        .post("/api/users/login", data)
        .then(({ data }) => {
          console.log(data);

          // console.log(data.token);

          dispatch(setUser(data));
          ToStorage("adminToken", data.token, remember);
          // toast.success("login sucess");
          navigate("/");

          // console.log(data.token);
        })
        .catch(({ response }) => {
          //In every reponse we may required same toast.error so axios interceptor reponse can be used
          // toast.error(response.data.message);

          console.log("I am inside the login error function");

          console.log(response);

          BackendvalidationError(formik, response);
        })
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <>
      <Container className="bg-white">
        <Row>
          <Col
            lg="4"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            <Row>
              <Col className="text-center">
                <h1>Login</h1>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form onSubmit={formik.handleSubmit}>
                  <InputField
                    label="Email"
                    name="email"
                    formik={formik}
                    type="text"
                  />
                  <InputField
                    type="password"
                    label="Password"
                    name="password"
                    formik={formik}
                  />
                  <Form.Check className="mb-2">
                    <Form.Check.Input
                      name="remember"
                      id="remember"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                    />
                    <Form.Check.Label htmlFor="remember">
                      Remember Me
                    </Form.Check.Label>
                  </Form.Check>

                  <div className="d-grid">
                    <SubmitBtn formik={formik} label="Login" />
                  </div>
                  {/* <SubmitBtn formik={formik} label="Add" icon="fa fa-plus" /> */}
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
