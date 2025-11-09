import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { LoadingComponent } from "../../components";
import { Link } from "react-router-dom";
import http from "../../http";
import { dtFormat } from "../../library";

const List = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      setLoading(true);
      const { data } = await http.get("/api/cms/categories");
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  console.log(categories);

  const handleDelete = async (slug) => {
    try {
      setLoading(true);
      await http.delete(`/api/cms/categories/${slug}`);
      const { data } = await http.get("/api/cms/categories");
      setCategories(data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col
            xs="12"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            {loading ? (
              <LoadingComponent />
            ) : (
              <>
                <Row>
                  <Col>
                    <h1>Category</h1>
                  </Col>
                  <Col xs="auto">
                    <Link
                      className="btn btn-dark btn-sm me-2"
                      to="/category/create"
                    >
                      <i className="fa-solid fa-plus me-2"></i>
                      Add Category
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {categories.length > 0 ? (
                      <Table bordered hover size="sm">
                        <thead className="table-dark">
                          <tr>
                            <th>Category Name</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((category, index) => (
                            <tr key={index}>
                              <td>{category.name}</td>
                              <td>{dtFormat(category.createdAt)}</td>
                              <td>{dtFormat(category.updatedAt)}</td>
                              <td>
                                <Link
                                  className="btn btn-dark btn-sm me-2"
                                  to={`/category/edit/${category.slug}`}
                                >
                                  <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>

                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(category.slug)}
                                >
                                  <i className="fa-solid fa-trash me-2"></i>
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <h4 className="text-muted">No categorys</h4>
                    )}
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default List;
