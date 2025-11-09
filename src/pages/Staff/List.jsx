import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import http from "../../http";
import { LoadingComponent } from "../../components";
import { dtFormat } from "../../library";

export const List = () => {
  useEffect(() => {
    document.title = "Staff";
  }, []);

  const [staffs, setStaffs] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    http
      .get("/api/admin/staffs")
      .then(({ data }) => setStaffs(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  function handleDelete(index) {
    // setIsLoading(true);

    http
      .delete(`/api/admin/staffs/${index}`)
      // .then(() => {
      //   setStaffs((prevStaffs) =>
      //     prevStaffs.filter((staff) => staff._id !== index)
      //   );
      // })
      .then(() => http.get("/api/admin/staffs"))
      .then(({ data }) => setStaffs(data))
      .catch();
  }

  return (
    <Container>
      <Row>
        <Col xs="12" className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto">
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <Row className="">
                <Col>
                  <h1>staffs</h1>
                </Col>

                <Col xs="auto">
                  <Link className="btn btn-dark btn-sm me-2" to="/staff/create">
                    <i className="fa-solid fa-plus me-2"></i>
                    Add Staffs
                  </Link>
                </Col>
              </Row>

              <Row>
                <Col>
                  {staffs.length > 0 ? (
                    <Table bordered hover size="sm">
                      <thead className="table-dark">
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Adress</th>
                          <th>Created at</th>
                          <th>Updated at</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffs.map((staff, index) => (
                          <tr>
                            <td>{staff.username}</td>
                            <td>{staff.email}</td>
                            <td>{staff.phoneno}</td>
                            <td>{staff.address}</td>

                            <td>{dtFormat(staff.updatedAt)}</td>
                            <td>{dtFormat(staff.updatedAt)}</td>
                            <td>
                              <Link
                                className="btn btn-dark btn-sm me-2"
                                to={`/staff/edit/${staff._id}`}
                              >
                                <i className="fa-solid fa-edit me-2"></i>Edit
                              </Link>

                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(staff._id)}
                              >
                                <i className="fa-solid fa-trash me-2"></i>Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (
                    <h4 className="text-muted">No staffs</h4>
                  )}
                </Col>
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
