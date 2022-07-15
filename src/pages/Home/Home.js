import React, { useEffect } from "react";
// import PropTypes from 'prop-types';
import "./Home.scss";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { workspacebooking } from "../../redux/ActionReducer/authSlice";

let name = "NAME!";

let cardContent = `Booked from 11th July, 2022 to 15th July, 2022 for Yuvaraj,Jashwanth, Mahesh, Karthick.`;

const Home = () => {
  const dispatch = useDispatch();
  const { workspace_details } = useSelector((state) => ({
    ...state.workspace_details,
  }));
  useEffect(() => {
    dispatch(workspacebooking());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(workspace_details, "workspace_details");
  return (
    <>
      <Container fluid className="home">
        <section className=" pt-5 pb-2 ">
          <Row>
            <Col md={12}>
              <h4 id="welcomeName-row">
                Welcome back <span id="text-name">{name}</span>
              </h4>
            </Col>
          </Row>
        </section>
        <hr className="hr" />
        <section className="custom-upcomingbooking-section pt-3 pb-3">
          <Row>
            <h4 className="headings">UPCOMING BOOKINGS</h4>
            <Col md={4}>
              <Card className="text-initial">
                <Card.Body>
                  <Card.Title className="cardheadings">Team Meeting</Card.Title>
                  <Card.Text className="cardtext">{cardContent}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        <hr className="hr" />
        <section className="custom-recentbooking-section pt-3 pb-3">
          <Row>
            <h4 className="headings">RECENT BOOKINGS</h4>
            <Col md={4}>
              <Card className="text-initial">
                <Card.Body>
                  <Card.Title className="cardheadings">Team Meeting</Card.Title>
                  <Card.Text className="cardtext">{cardContent}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-initial">
                <Card.Body>
                  <Card.Title className="cardheadings">Team Meeting</Card.Title>
                  <Card.Text className="cardtext">
                    Booked from 11th July, 2022 to 15th July, 2022 for Yuvaraj,
                    Jashwanth, Mahesh, Karthick.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="text-initial">
                <Card.Body>
                  <Card.Title className="cardheadings">Team Meeting</Card.Title>
                  <Card.Text className="cardtext">{cardContent}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
        <hr className="hr" />
      </Container>
    </>
  );
};
Home.propTypes = {};

Home.defaultProps = {};

export default Home;
