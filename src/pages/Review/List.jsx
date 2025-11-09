import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import http from "../../http";
import { LoadingComponent } from "../../components";

import { dtFormat } from "../../library";

const List = () => {
  const [loading, setLoading] = useState(false);

  const [reviews, setReviews] = useState([]);

  //   const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    http
      .get("/cms/reviews")
      .then(({ data }) => setReviews(data))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  function handleDelete(id) {
    setLoading(true);
    http
      .delete(`/cms/reviews/${id}`)
      .then(() => http.get("/cms/reviews"))
      .then(({ data }) => setReviews(data))
      .finally(() => setLoading(false));
  }

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
                    <h1>Review List</h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {reviews.length > 0 ? (
                      <Table bordered hover size="sm">
                        <thead className="table-dark">
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Comment</th>
                            <th>Rating</th>
                            <th>Product</th>
                            <th>Created At</th>

                            <th>Updated At</th>

                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviews.map((review, index) => (
                            <tr key={index}>
                              <td>{review.user?.name}</td>
                              <td>{review?.user?.email}</td>

                              <td>{review.comment}</td>

                              <td>{review.rating}</td>

                              <td>{review.product?.name}</td>

                              <td>{dtFormat(review.createdAt)}</td>
                              <td>{dtFormat(review.updatedAt)}</td>
                              <td>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDelete(review._id)}
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
                      <h4 className="text-muted">No reviews</h4>
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
