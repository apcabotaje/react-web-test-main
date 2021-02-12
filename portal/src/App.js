import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "./helper/axios";

// Load toast
import ToastMessage from "./helper/toastContainer";
import { toast } from "react-toastify";

//Import Component
import Nav from "./components/Nav";

function App() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    displayCatalog();
  }, []);

  const displayCatalog = () => {
    axios
      .get("catalog?key=3fc45675")
      .then((response) => {
        // Continue your code...
        setProducts(response.data);
        toast.success("Success!");
      })
      .catch(() => toast.error("Failed to fetch catalog.."));
  };

  const addProducts = (id) => {
    axios
      .post(`cart/${id}?key=3fc45675`)
      .then((response) => {
        // Continue your code...
        toast.success("Item Added to the Cart!");
        setCarts(response.data);
      })
      .catch(() => toast.error("Failed to Add Item.."));
  };

  return (
    <React.Fragment>
      <div className="container">
        <Nav />
        <h2 className="table mt-5 text-center">Available Products</h2>
        <table className="table mt-1 text-center">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    className="img-fluid img-thumbnail align-middle prod-img"
                    alt="product-img"
                  />
                </td>
                <td className="align-middle">{product.name}</td>
                <td className="align-middle">{product.description}</td>
                <td className="align-middle">{product.category}</td>
                <td className="align-middle">{product.price}</td>
                <td className="align-middle">
                  <button
                    className="btn btn-primary"
                    onClick={() => addProducts(product.id)}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastMessage />
      </div>
    </React.Fragment>
  );
}

export default App;
