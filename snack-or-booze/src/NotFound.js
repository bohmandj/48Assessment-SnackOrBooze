import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

function NotFound() {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              404 - Page Not Found
            </h3>
          </CardTitle>
          <CardText>
            The page you are looking for does not exist.
          </CardText>
          <ListGroup>
            <Link to={`/`}>
              <ListGroupItem>
                <h4>Return to Homepage</h4>
              </ListGroupItem>
            </Link>
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
};

export default NotFound;