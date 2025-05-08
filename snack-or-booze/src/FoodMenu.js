import React from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import "./FoodMenu.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

function FoodMenu({ allFood }) {
  // Menu page - displays name of all items on the menu
  const { foodMenu } = useParams();

  // Ensure menu in url exist or redirect to 404
  const food = allFood.find(f => f.menu === foodMenu);
  if (!food) return <Redirect to="/404" />

  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {food.title} Menu
          </CardTitle>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </CardText>
          <ListGroup>
            {food.items.map(item => (
              <Link to={`/${food.menu}/${item.id}`} key={`${food.menu}-${item.id}`}>
                <ListGroupItem>
                  {item.name}
                </ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default FoodMenu;
