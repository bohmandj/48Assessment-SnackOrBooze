import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./FoodMenu.css";
import "./NavBar.css";
import "./NewFoodForm.css";
import Home from "./Home.js";
import SnackOrBoozeApi from "./Api.js";
import NavBar from "./NavBar.js";
import { Route, Switch, Redirect } from "react-router-dom";
import FoodMenu from "./FoodMenu.js";
import FoodItem from "./FoodItem.js";
import NewFoodForm from "./NewFoodForm.js";
import NotFound from "./NotFound.js";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [allFood, setAllFood] = useState([]);

  async function getFood() {
    let snacks = await SnackOrBoozeApi.getSnacks();
    let drinks = await SnackOrBoozeApi.getDrinks();
    let food = [
      { menu: "snacks", title: "Snacks", items: snacks },
      { menu: "drinks", title: "Drinks", items: drinks }
    ];
    setAllFood(food);
    setIsLoading(false);
  }

  async function postNewFood(menu, newItem) {
    let resStatus = await SnackOrBoozeApi.postFood(menu, newItem);
    getFood();
    return resStatus;
  }

  useEffect(() => {
    getFood();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/404">
              <NotFound />
            </Route>
            <Route exact path="/">
              <Home allFood={allFood} />
            </Route>
            <Route exact path="/new-food-form">
              <NewFoodForm allFood={allFood} postNewFood={postNewFood} />
            </Route>
            <Route path="/:foodMenu/new-food-form">
              <NewFoodForm allFood={allFood} postNewFood={postNewFood} />
            </Route>
            <Route path="/:foodMenu/:itemId">
              <FoodItem allFood={allFood} />
            </Route>
            <Route path="/:foodMenu">
              <FoodMenu allFood={allFood} />
            </Route>
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
