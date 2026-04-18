import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";

const Edit = () => {
  // console.log("category edit is running");

  const [category, setCategory] = useState({});

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { slug } = useParams();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await http.put(
          `/api/cms/categories/${slug}`,
          values
        );

        setCategory(data.data);
        navigate("/category");
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  console.log(category);

  useEffect(() => {
    const getCatgeoryData = async () => {
      setLoading(true);
      try {
        const { data } = await http.get(`/api/cms/categories/${slug}`);
        console.log(data);
        
        setCategory(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCatgeoryData();
  }, []);

  // console.log(formik.values);

  useEffect(() => {
    console.log(`I am inside useEffect`, category);

    console.log(Object.keys(category));

    if (Object?.keys(category)?.length > 0) {
      for (let k in formik?.values) {
        console.log(formik?.values);
        formik.setFieldValue(k, category[k]);
      }
    }
    // console.log(staff);
  }, [category]);

  //   console.log(category);

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
                  <h1>Edit Page</h1>
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

                    <SubmitBtn formik={formik} label="Update" />
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
