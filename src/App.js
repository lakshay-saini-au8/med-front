import { Route, Switch, Redirect } from "react-router-dom";
import AllOrders from "./components/AllOrders";
import AllProducts from "./components/AllProducts";
import Cart from "./components/Cart";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import Header from "./components/Header";
import Orders from "./components/Orders";
import Users from "./components/Users";
import Login from "./pages/Login";
import MedicineDetail from "./pages/MedicineDetail";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
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
        <ProtectedRoute exact path="/orders" component={Orders} />
        <ProtectedRoute exact path="/allorders" component={AllOrders} />
        <ProtectedRoute exact path="/alluser" component={Users} />
        <ProtectedRoute exact path="/allProducts" component={AllProducts} />
        <ProtectedRoute
          exact
          path="/editProduct/:productId"
          component={EditProduct}
        />
        <ProtectedRoute exact path="/addProduct" component={AddProduct} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
