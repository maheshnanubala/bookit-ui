import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const BookSpaceConfirmation = () => {
  const [alert, setAlert] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
      navigate(`/`);
    }, 5000);
  }, [navigate]);

  return (
    <>
      {alert && (
        <Container>
          <Row className="mt-5">
            <Col>
              <Alert variant={"success"} className="text-center p-5">
                <i
                  className="bi bi-check-circle text-success"
                  style={{ fontSize: 50 }}
                ></i>
                <h3 className="mb-3">Congratulations!</h3>
                20 workstations have been booked at Ganesh Chambers, Building 2,
                Floor 3 from 11th July, 2022 to 15th July, 2022 for Yuvaraj,
                Jashwanth, Mahesh, Karthick. The emails have been sent to their
                respective members
              </Alert>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
