import "./App.css";
import Header from "./components/Header";
import ErrorComponent from "./components/ErrorComponent";
import FunctionComponent from "./components/FunctionComponent";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FunctionComponent />} />
          <Route path="/product" element={<FunctionComponent />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
