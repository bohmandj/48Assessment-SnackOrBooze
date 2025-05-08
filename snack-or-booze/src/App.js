import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import FoodMenu from "./FoodMenu";
import FoodItem from "./FoodItem";
import NotFound from "./NotFound";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [allFood, setAllFood] = useState([]);

  useEffect(() => {
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
