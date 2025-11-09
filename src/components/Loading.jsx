import React from "react";
import { Col, Row } from "react-bootstrap";

export const LoadingComponent = () => {
  return (
    <div>
      <Row>
        <Col className="text-center py-4">
          <i className="fa-solid fa-refresh fa-spin me-2"></i>Loading
        </Col>
      </Row>
    </div>
  );
};
