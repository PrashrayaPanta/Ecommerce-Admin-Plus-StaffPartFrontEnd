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
      slogan: "",
      image: [],
    },
    // validationSchema: Yup.object({
    //   name: Yup.string().required(),
    //   slogan: Yup.string().required(),
    //   image: Yup.string().required(),
    // }),

    onSubmit: (data, { setSubmitting }) => {
      const fd = new FormData();

      for (let k in data) {
        if (k === "image") {
          for (let files of data[k]) {
            fd.append(k, files);
          }
        } else {
          fd.append(k, data[k]);
        }
      }

      const createBrand = async () => {
        try {
          const { data } = await http.post("/api/cms/brands", fd, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          navigate("/brand");
        } catch (error) {
        } finally {
          setSubmitting(false);
        }
      };

      createBrand();

      // http
      //   .post("/api/admin/brands", fd, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then(({ data }) => navigate("/brand"))
      //   .catch()
      //   .finally(() => setSubmitting(false));
    },
  });
  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          <Row>
            <Col>
              <h1> Create brands</h1>
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
                  label="Slogan"
                  name="slogan"
                  formik={formik}
                  as="textarea"
                />

                <div className="mb-2">
                  <Form.Label htmlFor="image">Image</Form.Label>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-danger mb-2"
                    height="18"
                    width="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 6v12"></path>
                    <path d="M17.196 9 6.804 15"></path>
                    <path d="m6.804 9 10.392 6"></path>
                  </svg>
                  <Form.Control
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    isValid={
                      formik.values.image.length > 0 && !formik.errors.image
                    }
                    isInvalid={formik.touched.image && formik.errors.image}
                    onChange={({ target }) =>
                      formik.setFieldValue("image", Array.from(target.files))
                    }
                    onBlur={formik.handleBlur}
                  ></Form.Control>
                  {formik.touched.image && formik.errors.image && (
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.image}
                    </Form.Control.Feedback>
                  )}

                  {formik.values.image.length > 0 && (
                    <Row>
                      {formik.values.image.map((file, i) => (
                        <Col xs="4" className="mt-3" key={i}>
                          <img
                            src={URL.createObjectURL(file)}
                            className="img-fluid"
                            alt=""
                            srcset=""
                          />
                        </Col>
                      ))}
                    </Row>
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

export default Create;
