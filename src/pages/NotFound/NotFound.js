import React from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className="notfound-block">
      <Row className="mt-5">
        <Col>
          <h1>
            <i className="bi bi-emoji-frown-fill me-3" />
            Sorry !!!!
          </h1>
          <p className="mt-4">Error Occured, kindly try again.</p>
          <Button className="try-again-btn" onClick={() => navigate("/home")}>
            Back to home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
