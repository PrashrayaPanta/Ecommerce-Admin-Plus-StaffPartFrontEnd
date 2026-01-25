import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
// import YupPassword from "yup-password";
import http from "../../http";
import { useNavigate, useParams } from "react-router-dom";
import { BackendvalidationError, imgURLForProduct } from "../../library";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components";

// YupPassword(Yup); // extend yup

export const Edit = () => {
  // console.log("I ma in edit pagfe");

  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({});

  const { slug } = useParams();

  // console.log(product);

  // console.log(brands);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      summary: "",
      originalPrice: "",
      price: "",
      categoryId: "",
      brandId: "",
      stock: "",
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string().required(),
      originalPrice: Yup.string().required(),
      price: Yup.number().required(),
      categoryId: Yup.string().required("Category Name is required"),
      brandId: Yup.string().required("Brand Name is required"),
      stock: Yup.string().required("Stock required"),
      images: Yup.mixed()
        .nullable()
        .test("type", "select valid image files", (files) => {
          for (let image of files) {
            if (!image.type.startsWith("image")) {
              return false;
            }
          }
          return true;
        }),
    }),
    onSubmit: (data, { setSubmitting }) => {
      console.log("This is the data after submisssion");

      console.log(data);
      // console.log(data);
      // console.log("Hello");

      const fd = new FormData();

      // console.log("Form data object is cretaed");

      // console.log(form dat);

      // Existing      //Old images images

      for (let k in data) {
        console.log(k);

        //New Image Upload - only append if there are actual files
        if (k == "images") {
          for (let files of data[k]) {
            console.log(files);
            fd.append(k, files);
          }
        } else {
          fd.append(k, data[k]);
        }
      }

      http
        .put(`/api/cms/products/${slug}`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => navigate("/product"))
        .catch(({ response }) => BackendvalidationError(formik, response))
        .finally(() => setSubmitting(false));
    },
  });

  const getCatgeoriesData = async () => {
    const { data } = await http.get("/api/cms/categories");
    setCategories(data.data);
  };

  const getBrandsData = async () => {
    const { data } = await http.get("/api/cms/brands");
    setBrands(data.data);
  };

  useEffect(() => {
    try {
      getCatgeoriesData();
      getBrandsData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    // setLoading(true);
    // http
    //   .get("/api/admin/categories")
    //   .then(({ data }) => {
    //     setCategories(data.Categories);
    //     return http.get("/api/admin/brands");
    //   })
    //   .then(({ data }) => {
    //     setBrands(data.brands);
    //     return http.get(`/api/admin/products/${id}`);
    //   })
    //   .then(({ data }) => setProduct(data.product))
    //   .catch((error) => console.log(error))
    //   .finally(() => setLoading(false));
  }, []);

  const getProductData = async () => {
    try {
      setLoading(true);
      const { data } = await http.get(`/api/cms/products/${slug}`);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  console.log("This is after the getProductData calling");

  console.log(product);

  // console.log(product);

  // console.log(formik);

  // console.log(formik.values);

  useEffect(() => {
    if (Object?.keys(product).length > 0) {
      for (let k in formik.values) {
        if (k != "images") {
          formik.setFieldValue(k, product[k]);
        }
      }
    }

    // console.log(staff);
  }, [product]);

  // console.log(images);

  const handleDelete = async (filename) => {
    try {
      setLoading(true);
      await http.delete(`/api/cms/products/${slug}/${filename}`);
      const { data } = await http.get(`/api/cms/products/${slug}`);
      setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(product);

  console.log(formik.values.stock);

  // console.log(categories);

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
                    <h1>Edit Products</h1>
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
                        label="Description"
                        name="description"
                        formik={formik}
                        as="textarea"
                      />
                      <InputField
                        type="text"
                        label="Summary"
                        name="summary"
                        formik={formik}
                        as="textarea"
                      />
                      {/* Category */}
                      <div className="mb-2">
                        <Form.Label htmlFor="categoryId">Category</Form.Label>
                        <Form.Select
                          name="categoryId"
                          id="categoryId"
                          value={formik.values.categoryId}
                          isValid={
                            formik.values.categoryId &&
                            !formik.errors.categoryId
                          }
                          isInvalid={
                            formik.touched.categoryId &&
                            formik.errors.categoryId
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Select Category</option>
                          {categories.map((category, index) => (
                            <option value={category._id} key={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </Form.Select>
                        {formik.errors.categoryId && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.categoryId}
                          </Form.Control.Feedback>
                        )}
                      </div>
                      {/* Brand */}
                      <div className="mb-2">
                        <Form.Label htmlFor="brandId">Brand</Form.Label>
                        <Form.Select
                          name="brandId"
                          id="brandId"
                          value={formik.values.brandId}
                          isValid={
                            formik.values.brandId && !formik.errors.brandId
                          }
                          isInvalid={
                            formik.touched.brandId && formik.errors.brandId
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Select Brand</option>
                          {brands?.map((brand, index) => (
                            <option value={brand._id} key={brand._id}>
                              {brand.name}
                            </option>
                          ))}
                        </Form.Select>
                        {formik.errors.brandId && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.brandId}
                          </Form.Control.Feedback>
                        )}
                      </div>

                      {/* Stock */}
                      <div className="mb-2">
                        <Form.Label htmlFor="brandId">Stock</Form.Label>
                        <svg
                          stroke="currentColor"
                          fill="none"
                          stroke-width="2"
                          viewBox="0 0 24 24"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="text-danger mb-2"
                          height="18"
                          width="18"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 6v12"></path>
                          <path d="M17.196 9 6.804 15"></path>
                          <path d="m6.804 9 10.392 6"></path>
                        </svg>
                        <Form.Select
                          name="stock"
                          id="stock"
                          value={formik.values.stock}
                          isValid={formik.values.stock && !formik.errors.stock}
                          isInvalid={
                            formik.touched.stock && formik.errors.stock
                          }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option>Stock Status</option>
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                        </Form.Select>
                        {formik.errors.stock && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.stock}
                          </Form.Control.Feedback>
                        )}
                      </div>

                      <div className="mb-2">
                        <Form.Label htmlFor="images">Images</Form.Label>
                        <Form.Control
                          type="file"
                          name="images"
                          id="images"
                          accept="image/*"
                          multiple
                          isValid={
                            formik.values.images?.length > 0 &&
                            !formik.errors.images
                          }
                          isInvalid={
                            formik.touched.images && formik.errors.images
                          }
                          onChange={({ target }) =>
                            formik.setFieldValue(
                              "images",
                              Array.from(target.files)
                            )
                          }
                          onBlur={formik.handleBlur}
                        ></Form.Control>
                        {formik.touched?.images && formik.errors?.images && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors?.images}
                          </Form.Control.Feedback>
                        )}

                        {/* For Preview of Image */}
                        {formik.values?.images?.length > 0 && (
                          <Row>
                            {formik.values.images?.map((file, i) => (
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

                        {/* Existing Images */}
                        <Row>
                          {product?.images?.map((image, i) => (
                            <Col xs="3" className="mt-3">
                              <Row>
                                <Col>
                                  <img
                                    src={imgURLForProduct(image?.public_id)}
                                    className="img-fluid"
                                    alt=""
                                    srcset=""
                                  />
                                </Col>
                              </Row>
                              <Row className="">
                                <Col className="mt-3 text-center">
                                  <Button
                                    onClick={() =>
                                      handleDelete(image?.public_id)
                                    }
                                    variant="danger"
                                    size="sm"
                                    type="button"
                                  >
                                    <i className="fa-solid fa-times me-2"></i>
                                    delete
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          ))}
                        </Row>
                      </div>
                      <InputField
                        type="text"
                        label="Initial Price"
                        name="originalPrice"
                        formik={formik}
                      />
                      <InputField
                        type="text"
                        label="Price"
                        name="price"
                        formik={formik}
                      />

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
