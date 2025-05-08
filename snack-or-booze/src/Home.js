import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from "reactstrap";

function Home({ allFood }) {
  // Home page of the site - displays all menu titles w/ # of items
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
            {allFood.map((food) => (
              <Link to={`/${food.menu}`} key={`home-${food.menu}`}>
                <ListGroupItem><h4>{food.items.length} {food.title}</h4></ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
