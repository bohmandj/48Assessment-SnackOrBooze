import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

function FoodItem({ allFood }) {
  // Item page - displays all info of individual item on the menu
  const { foodMenu, itemId } = useParams();

  // Ensure menu and item in url exist or redirect to 404
  const food = allFood.find(f => f.menu === foodMenu);
  if (!food) return <Redirect to="/404" />

  const item = food.items.find(i => i.id === itemId);
  if (!item) return <Redirect to={`/${food.menu}`} />

  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {item.name}
          </CardTitle>
          <CardText className="font-italic">{item.description}</CardText>
          <p>
            <b>Recipe:</b> {item.recipe}
          </p>
          <p>
            <b>Serve:</b> {item.serve}
          </p>
        </CardBody>
      </Card>
    </section>
  );
}

export default FoodItem;
