import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {

  static async getSnacks() {
    const result = await axios.get(`${BASE_API_URL}/snacks`);
    return result.data;
  }

  static async getDrinks() {
    const result = await axios.get(`${BASE_API_URL}/drinks`);
    return result.data;
  }

  static async postFood(menu, newItem) {
    await axios.post(`${BASE_API_URL}/${menu}`, newItem)
      .then(function (res) {
        return res.status;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

}

export default SnackOrBoozeApi;
