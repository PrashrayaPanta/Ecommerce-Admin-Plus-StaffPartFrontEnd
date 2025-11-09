import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";
import http from "../../http";
import { useNavigate, useParams } from "react-router-dom";
import { imgURLForBrand } from "../../library";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components";

// YupPassword(Yup); // extend yup

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState({});

  const { slug } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      slogan: "",
      image: [],
    },
    onSubmit: (data, { setSubmitting }) => {
      console.log("I ma inside the oinsubmit handler of edit");

      console.log("=== BRAND EDIT FORM SUBMISSION ===");
      console.log("Form data:", data);
      console.log("Image array:", data.image);
      console.log("Image length:", data.image?.length);

      const fd = new FormData();

      for (let k in data) {
        if (k == "image") {
          // Only append image if there are actual files selected
          // For brand, we use single file, so only append the first file
          fd.append(k, data[k][0]); // Only append first file for single upload
        } else {
          fd.append(k, data[k]);
        }
      }

      //Sending the form data

      const sendUpdatedFormData = async () => {
        try {
          // Don't manually set Content-Type - let browser set it with boundary
          const { data } = await http.put(`/api/cms/brands/${slug}`, fd, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          navigate("/brand");
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
        }
      };

      sendUpdatedFormData();
    },
  });

  const getBrandData = async () => {
    try {
      setLoading(true);
      const { data } = await http.get(`/api/cms/brands/${slug}`);
      setBrand(data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrandData();
  }, []);

  useEffect(() => {
    if (Object.keys(brand).length > 0) {
      for (let k in formik.values) {
        if (k != "image") {
          formik.setFieldValue(k, brand[k]);
        }
      }
    }
  }, [brand]);

  const handleDelete = async (id, public_id) => {
    try {
      setLoading(true);

      await http.delete(`/api/cms/brands/${slug}/${public_id}`);

      const { data } = await http.get(`/api/cms/brands/${slug}`);

      setBrand(data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
    console.log(id);

    console.log(public_id);
  };

  return (
    <>
      <Container className="bg-white">
        <Row>
          <Col
            sm="12"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <Row>
                  <Col className="text-center">
                    <h1>Edit Brand</h1>
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
                        <Form.Label htmlFor="images">Image</Form.Label>
                        <Form.Control
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                          onChange={({ target }) =>
                            formik.setFieldValue(
                              "image",
                              target.files.length > 0 ? [target.files[0]] : []
                            )
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

                        {brand?.logo && (
                          <Row>
                            <Col xs="3" className="mt-3">
                              <img
                                src={imgURLForBrand(brand.logo.public_id)}
                                className="img-fluid"
                                alt="Current brand logo"
                              />
                              <Row className="mt-2">
                                <Col className="text-center">
                                  <Button
                                    onClick={() =>
                                      handleDelete(
                                        brand.slug,
                                        brand.logo.public_id
                                      )
                                    }
                                    variant="danger"
                                    size="sm"
                                    type="button"
                                  >
                                    <i className="fa-solid fa-times me-2"></i>
                                    Delete Current Image
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
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
    </>
  );
};

export default Edit;
