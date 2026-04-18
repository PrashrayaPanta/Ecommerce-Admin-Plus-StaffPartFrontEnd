import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { LoadingComponent } from "../../components";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import http from "../../http";
import { dtFormat, imgURLForBrand } from "../../library";

import Pagination from 'react-bootstrap/Pagination'



import "./List.css";

const List = () => {
  const [loading, setLoading] = useState(true);

  const [brands, setbrands] = useState([]);


  const [totalItems, setTotalItems] = useState("");

  const [totalPages, setTotalPages] = useState("");

  const { search } = useLocation();


  const onlyPage = search?.split("&")[0]?.split("=")[1];

  const onlyLimit = search?.split("&")[1]?.split("=")[1];




  const navigate = useNavigate();



  const getThatMuchBrands = async () => {
    try {
      setLoading(true);
      const { data } = await http.get(`/api/cms/brands?page=${onlyPage}&limit=${onlyLimit}`);
      setTotalPages(data.result.totalPages);
      setTotalItems(data.result.totalItems);
      setbrands(data.result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getThatMuchBrands()
  }, [onlyPage, onlyLimit]);

  console.log(brands);

  const handleDelete = async (id) => {
    // console.log("clicked");

    setLoading(true);

    try {
      await http.delete(`/api/cms/brands/${id}`);

      const { data } = await http.get(`/api/cms/brands?page=${onlyPage}&limit=${onlyLimit}`);

      setbrands(data.result.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
    // const {data}
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
                    <h1>Brand</h1>
                  </Col>
                  <Col xs="auto">
                    <Link
                      className="btn btn-dark btn-sm me-2"
                      to="/brand/create"
                    >
                      <i className="fa-solid fa-plus me-2"></i>
                      Add Brand
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {brands?.length > 0 ? (
                      <Table bordered hover size="sm">
                        <thead className="table-dark">
                          <tr>
                            <th>Brand Name</th>

                            <th>Slogan</th>

                            <th>Image</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {brands.map((brand, index) => (
                            <tr key={index}>
                              <td>{brand.name}</td>
                              <td>{brand.slogan}</td>
                              <td>
                                <a
                                  href={imgURLForBrand(brand?.logo?.public_id)}
                                >
                                  <img
                                    src={imgURLForBrand(brand?.logo?.public_id)}
                                    className="img-sm"
                                  />
                                </a>
                              </td>

                              <td>{dtFormat(brand.createdAt)}</td>
                              <td>{dtFormat(brand.updatedAt)}</td>
                              <td>
                                <Link
                                  className="btn btn-dark btn-sm me-2"
                                  to={`/brand/edit/${brand.slug}`}
                                >
                                  <i className="fa-solid fa-edit me-2"></i>Edit
                                </Link>

                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(brand.slug)}
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
                      <h4 className="text-muted">No Brand</h4>
                    )}
                  </Col>
                </Row>
              </>
            )}
            {/* <Row>
            <Col>
              <h1>Welcome to category</h1>
            </Col>
          </Row> */}
          </Col>
        </Row>
      </Container>

      {

        <Container>
          <Row>
            <Col xs="12">
              {
                loading ? <LoadingComponent /> : <>


                  <Row>
                    <Col>
                      {
                        brands.length > 0 && <Pagination>
                          {/* <Pagination.First /> */}
                          <Pagination.Prev />
                          {
                            [...Array(totalPages)].map((_, index) => (
                              <Pagination.Item onClick={() => navigate(`/brand?page=${index + 1}&limit=${4}`)}>{index + 1}</Pagination.Item>
                            ))
                          }

                          <Pagination.Next />
                          {/* <Pagination.Last /> */}
                        </Pagination>

                      }
                    </Col>

                  </Row>

                </>

              }


            </Col>


          </Row>

        </Container>


      }




    </div>

  );
};

export default List;
