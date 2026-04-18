import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { dtFormat, imgURLForProduct } from "../../library";
import "./List.css";
import Pagination from 'react-bootstrap/Pagination'



export const List = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const [totalItems, setTotalItems] = useState("");

  const [totalPages, setTotalPages] = useState("");

  const { search } = useLocation();

  const navigate = useNavigate()

  const onlyPage = search?.split("&")[0]?.split("=")[1];

  const onlyLimit = search?.split("&")[1]?.split("=")[1];


  const getThatMuchProductsData = async () => {
    try {
      setIsLoading(true);
      const { data } = await http.get(`/api/products?page=${onlyPage}&limit=${onlyLimit}`);
      console.log(data.result.data);
      setTotalPages(data.result.totalPages);
      setTotalItems(data.result.totalItems);
      setProducts(data.result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getThatMuchProductsData()
  }, [onlyPage, onlyLimit]);

  const handleDeleteProduct = async (product) => {
    try {
      setIsLoading(true);
      await http.delete(`/api/cms/products/${product.slug}`);
      const { data } = await http.get("/api/cms/products");
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(products);

  console.log(totalPages);
  

  return (
    <>
      <Container>
        <Row>
          <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
            {isLoading ? (
              <LoadingComponent />
            ) : (
              <>
                <Row className="align-items-center mb-3">
                  <Col>
                    <h1>Products</h1>
                  </Col>
                  <Col xs="auto">
                    <Link
                      className="btn btn-dark btn-sm me-2"
                      to="/product/create"
                    >
                      <i className="fa-solid fa-plus me-2"></i>
                      Add Product
                    </Link>
                  </Col>
                </Row>

                {products?.length > 0 ? (
                  <Table bordered hover size="sm">
                    <thead className="table-dark">
                      <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Summary</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Stock</th>
                        <th>Original Price</th>
                        <th>Price</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td>{product.description}</td>
                          <td>{product.summary}</td>
                          <td>
                            {product.images?.length > 0 && (
                              <a
                                href={imgURLForProduct(
                                  product.images[0]?.public_id
                                )}
                              >
                                <img
                                  src={imgURLForProduct(
                                    product?.images[0]?.public_id
                                  )}
                                  className="img-sm"
                                  alt="Product"
                                />
                              </a>
                            )}
                          </td>
                          <td>{product?.categoryName}</td>
                          <td>{product?.brandName}</td>
                          <td>{product?.stock}</td>
                          <td>Rs {product.originalPrice}</td>
                          <td>Rs {product.price}</td>
                          <td>{dtFormat(product?.createdAt)}</td>
                          <td>{dtFormat(product?.updatedAt)}</td>
                          <td>
                            <Link
                              className="btn btn-dark btn-sm me-2"
                              to={`/product/edit/${product.slug}`}
                            >
                              <i className="fa-solid fa-edit me-2"></i>Edit
                            </Link>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              <i className="fa-solid fa-trash me-2"></i>Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h4 className="text-muted">No products found</h4>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
      {
        products.length > 0 && (
          <Container>
            <Row>
              <Col>
                <Pagination>
                  {/* <Pagination.First /> */}
                  <Pagination.Prev />
                  {                    
                    [...Array(totalPages)].map((_, index) => (
                      <Pagination.Item onClick={() => navigate(`/product?page=${index + 1}&limit=${4}`)}>{index + 1}</Pagination.Item>
                    ))
                  }

                  <Pagination.Next />
                  {/* <Pagination.Last /> */}
                </Pagination>

              </Col>


            </Row>

          </Container>

        )

      }
    </>

  );
};
