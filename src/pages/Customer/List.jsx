import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { Link } from "react-router-dom";
import { dtFormat } from "../../library";

export const List = () => {
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    http
      .get("/cms/customers")
      .then(({ data }) => setCustomers(data))
      .catch()
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    // console.log("clicked");

    console.log(id);

    http
      .delete(`/cms/customers/${id}`)
      .then(() => http.get("/cms/customers"))
      .then(({ data }) => setCustomers(data))
      .catch();
  };

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
                  <h1>Customers</h1>
                </Col>
                <Col xs="auto">
                  <Link
                    className="btn btn-dark btn-sm me-2"
                    to="/customer/create"
                  >
                    <i className="fa-solid fa-plus me-2"></i>
                    Add Customer
                  </Link>
                </Col>
              </Row>
              <Row>
                <Col>
                  {customers.length > 0 ? (
                    <Table bordered hover size="sm">
                      <thead className="table-dark">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Adress</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Created at</th>
                          <th>Updated at</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((customer, index) => (
                          <tr key={index}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.address}</td>
                            <td>{customer.role}</td>
                            <td>{customer.status ? "Active" : "Inactive"}</td>
                            <td>{dtFormat(customer.updatedAt)}</td>
                            <td>{dtFormat(customer.updatedAt)}</td>
                            <td>
                              <Link
                                className="btn btn-dark btn-sm me-2"
                                to={`/customer/edit/${customer._id}`}
                              >
                                <i className="fa-solid fa-edit me-2"></i>Edit
                              </Link>

                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(customer._id)}
                              >
                                <i className="fa-solid fa-trash me-2"></i>Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h4 className="text-muted">No customers</h4>
                  )}
                </Col>
              </Row>
            </>
          )}
          {/* <Row>
            <Col>
              <h1>Welcome to Customer</h1>
            </Col>
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
};
