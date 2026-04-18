import { Col, Container, Form, Row } from "react-bootstrap";
import { InputField, SubmitBtn } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
// import YupPassword from "yup-password";
import http from "../../http";
import { useNavigate } from "react-router-dom";
import { BackendvalidationError } from "../../library";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../components";

// YupPassword(Yup); // extend yup

export const Create = () => {
  const [categories, setCategories] = useState([]);

  const [brands, setBrands] = useState([]);

  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      originalPrice: "",
      price: "",
      summary: "",
      categoryId: "",
      brandId: "",
      stock: "",
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      description: Yup.string().required(),
      originalPrice: Yup.number().required(),
      price: Yup.number().required(),
      categoryId: Yup.string().required("Category Name is required"),
      brandId: Yup.string().required("Brand Name is required"),
      stock: Yup.string().required("Please choose stock status"),
      images: Yup.mixed()
        .test("count", "select atleast one file", (files) => files.length > 0)
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
      console.log(data);
      // console.log("Hello");

      const fd = new FormData();

      // console.log("Form data object is cretaed");

      // console.log(form dat);

      for (let k in data) {
        if (k == "images") {
          for (let files of data[k]) {
            fd.append(k, files);
          }
        } else {
          fd.append(k, data[k]);
        }
      }

      http
        .post("/api/cms/products", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => navigate("/product"))
        .catch(({ response }) => BackendvalidationError(formik, response))
        .finally(() => setSubmitting(false));
    },
  });

  console.log("I am the value that is being typing stated ", formik);
  

  // const getPromiseCatgeioriesData = () => {
  //   return http.get("/api/cms/categories");
  // };

  // const getPromiseBrandsData = () => {
  //   return http.get("/api/cms/brands");
  // };

  // const getPromiesCategoriesPlusBrandData = async () => {
  //   const promise = await Promise.all([
  //     getPromiseCatgeioriesData(),
  //     getPromiseBrandsData(),
  //   ]);
  //   return promise;
  // };

  // console.log(getPromiesCategoriesPlusBrandData());


    //     console.log(data);
    //   });

    // setLoading(false);
    // const startTime = performance.now() / 1000;
    // console.log("Started hititng the request at", startTime);


  //   http
  //     .get("/api/categories")
  //     .then(({ data }) => {
  //       console.log(data);
  //       setCategories(data.data);
  //       console.log(performance.now() / 1000);
  //       return http.get("/api/brands");
  //     })
  //     .then(({ data }) => {
  //       console.log(data);
  //       setBrands(data.data)
  //     })  
  //     .catch()
  //     .finally(() => {
  //       setLoading(false)
  //        console.timeEnd("categories and brands");
  //     });
  // }, []);


  // const getCategoriesPlusBrands = async () => {

  //   console.time("categories and brands");

  //   try {
  //     setLoading(true);

  //     const categoriesData = await http.get("/api/categories");

  //     setCategories(categoriesData.data.data);

  //     const {data} = await http.get("/api/brands");
      

  //     setBrands(data.data);





  //   } catch (error) {

  //     console.log(error);
      

  //   } finally {

  //     setLoading(false);

  //     console.timeEnd("categories and brands");


  //   }


  // }


  const getCategoriesDta = () => {
    return http.get("/api/categories");
  }


  const getBrandsDta = () => {
    return http.get("/api/brands");
  }


  const getCategoriesPlusBrandsData = async () => {

    console.time("categories and brands");

    try {


      const data = await Promise.all([getCategoriesDta(), getBrandsDta()]);
    
      setCategories(data[0].data.data);


      setBrands(data[1].data.data);
    
      
    } catch (error) {
      
      console.log(error);
      

    } finally {
      setLoading(false)
      console.timeEnd("categories and brands");
    }




    
    

  
    


  


    // console.log(promise);


    




    // console.log(promise);
    


  }


  useEffect(() => {
    getCategoriesPlusBrandsData()
  }, [])




  return (
    <>
      <Container className="bg-white">
        <Row>
          <Col
            sm="12"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            {Loading ? (
              <LoadingComponent />
            ) : (
              <>
                <Row>
                  <Col className="text-center">
                    <h1>Add Products</h1>
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
                          {categories.map((category) => (
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
                          <option value="">Select Brand</option>
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
                          <option value="">Stock Status</option>
                          <option value="active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </Form.Select>
                        {formik.errors.stock && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.stock}
                          </Form.Control.Feedback>
                        )}
                      </div>

                      <div className="mb-2">
                        <Form.Label htmlFor="images">Images</Form.Label>
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

                        <Form.Control
                          type="file"
                          name="images"
                          id="images"
                          accept="image/*"
                          multiple
                          isValid={
                            formik.values.images.length > 0 &&
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
                        {formik.touched.images && formik.errors.images && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.images}
                          </Form.Control.Feedback>
                        )}

                        {formik.values.images.length > 0 && (
                          <Row>
                            {formik.values.images.map((file, i) => (
                              <Col xs="4" className="mt-3" key={i}>
                                <img
                                  src={URL.createObjectURL(file)}
                                  className="img-fluid"
                                  alt=""
                                  srcset=""
                                  multiple
                                />
                              </Col>
                            ))}
                          </Row>
                        )}
                      </div>

                      <InputField
                        type="text"
                        label="OriginalPrice"
                        name="originalPrice"
                        formik={formik}
                      />

                      <InputField
                        type="text"
                        label="Price"
                        name="price"
                        formik={formik}
                      />

                      <SubmitBtn formik={formik} label="Create" />
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
