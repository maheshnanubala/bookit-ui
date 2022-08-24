import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

export const GenericNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="notfound-block generic-not-foundblock">
      <Container>
        <Row className="pt-5 text-center">
          <Col>
            <h1>
              <i class="bi bi-exclamation-triangle-fill " />
            </h1>
            <h2>404</h2>
            <p className="mt-5">Error Occured, Page not Found</p>
            <Button className="try-again-btn" onClick={() => navigate("/")}>
              Back to Signin
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
