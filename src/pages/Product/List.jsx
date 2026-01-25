import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { dtFormat, imgURLForProduct } from "../../library";
import "./List.css";

export const List = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProductsData = async () => {
    try {
      setIsLoading(true);
      const { data } = await http.get("/api/cms/products");
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

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

  return (
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

              {products.length > 0 ? (
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
                        <td>
                          {product?.stock == true
                            ? "Product Availabel"
                            : "Not Avaiable"}
                        </td>
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
  );
};
