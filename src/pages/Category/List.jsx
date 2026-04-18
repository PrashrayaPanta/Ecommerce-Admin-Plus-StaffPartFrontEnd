import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { LoadingComponent } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import http from "../../http";
import { dtFormat } from "../../library";


import Pagination from 'react-bootstrap/Pagination'


const List = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [totalItems, setTotalItems] = useState("");

  const [totalPages, setTotalPages] = useState("");

  const { search } = useLocation();


  const onlyPage = search?.split("&")[0]?.split("=")[1];

  const onlyLimit = search?.split("&")[1]?.split("=")[1];

  const navigate = useNavigate();

  const getThatMuchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await http.get(`/api/cms/categories?page=${onlyPage}&limit=${onlyLimit}`);
      setTotalPages(data.result?.totalPages);
      setTotalItems(data.result?.totalItems);
      setCategories(data.result?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getThatMuchCategories()
  }, [onlyPage, onlyLimit]);


  const handleDelete = async (slug) => {
    try {
      setLoading(true);
      await http.delete(`/api/cms/categories/${slug}`);
      const { data } = await http.get(`/api/cms/categories?page=${onlyPage}&limit=${onlyLimit}`);
      setCategories(data.result.data);
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

      {
        categories.length > 0 && (
          <Container>
            <Row>
              <Col>
                <Pagination>
                  {/* <Pagination.First /> */}
                  <Pagination.Prev />
                  {
                    [...Array(totalPages)].map((_, index) => (
                      <Pagination.Item onClick={() => navigate(`/category?page=${index + 1}&limit=${4}`)}>{index + 1}</Pagination.Item>
                    ))
                  }

                  <Pagination.Next />
                  {/* <Pagination.Last /> */}
                </Pagination>

              </Col>


            </Row>

          </Container>)
      }



    </div>
  );
};

export default List;
