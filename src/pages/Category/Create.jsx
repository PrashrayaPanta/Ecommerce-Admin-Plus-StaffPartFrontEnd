import React from "react";
import { Col, Container, Row, Form } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";

import * as Yup from "yup";
import http from "../../http";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
    }),

    onSubmit: (data, { setSubmitting }) => {
      async function createCategory() {
        try {
          await http.post("/api/cms/categories", data);
          navigate("/category");
        } catch (error) {
        } finally {
          setSubmitting(false);
        }
      }

      createCategory();
    },
  });
  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          <Row>
            <Col>
              <h1> Create Category </h1>
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

                <SubmitBtn formik={formik} label="Create" />
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
