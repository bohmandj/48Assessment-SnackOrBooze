import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from "reactstrap";

function Home({ snacks, drinks }) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
          </CardTitle>
          <ListGroup>
            <Link to={`/snacks`}>
              <ListGroupItem><h4>{snacks.length} Snacks</h4></ListGroupItem>
            </Link>
            <Link to={`/drinks`}>
              <ListGroupItem><h4>{drinks.length} Drinks</h4></ListGroupItem>
            </Link>
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
