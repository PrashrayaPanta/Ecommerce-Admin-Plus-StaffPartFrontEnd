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
      name: Yup.string().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);

      const CategoryEditData = async () => {
        try {
          const { data } = await http.put(
            `/api/admin/categories/${slug}`,
            values
          );

          // console.log(data);

          setCategory(data.data);
          navigate("/category");
        } catch (error) {
        } finally {
          setSubmitting(false);
        }
      };

      CategoryEditData();

      // http
      //   .put(`/api/admin/categories/${slug}`, data)
      //   .then(({ data }) => {
      //     setCategory(data.data);

      //     navigate("/category");
      //   })
      //   .catch()
      //   .finally(() => setSubmitting(false));
    },
  });

  console.log(category);

  useEffect(() => {
    const getCatgeoryData = async () => {
      setLoading(true);
      try {
        const { data } = await http.get(`/api/admin/categories/${slug}`);
        setCategory(data.data);
      } catch (error) {
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
