import React, { useEffect } from "react";

import { Col, Container, Row } from "react-bootstrap";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
      <Container>
        <Row>
          <Col
            xs="12"
            className="bg-white rounded-2 shadow-sm py-3 my-3 mx-auto"
          >
            <Row>
              <Col>
                <h1>Welcome to Dashboard</h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
