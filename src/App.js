import { Route, Switch } from "react-router-dom";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Login from "./pages/Login";
import MedicineDetail from "./pages/MedicineDetail";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={ProductPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/product/detail/:productId"
          component={MedicineDetail}
        />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/orders" component={Orders} />
        <Route exact path="/allorders" component={Orders} />
        <Route exact path="/alluser" component={Users} />
        {/* <Route path="/login" component={LoginPage} />
        <Route path="/register" component={LoginPage} /> */}
      </Switch>
    </>
  );
}

export default App;
