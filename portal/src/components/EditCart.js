import React, { useState, useEffect } from "react";
import axios from "../helper/axios";

// Load toast
import ToastMessage from "../helper/toastContainer";
import { toast } from "react-toastify";

function EditCart(props) {
  const [cartList, addToCart] = useState([]);
  const [qty, setQty] = useState();
  const [total, setTotal] = useState();
  const sum = [];

  useEffect(() => {
    displayCart();
  }, []);

  const displayCart = () => {
    axios
      .get("cart?key=3fc45675")
      .then((response) => {
        addToCart(response.data);
      })
      .catch(() => toast.error("Failed to fetch cart.."));
  };

  const cartCheckout = () => {
    axios
      .delete("cart/checkout?key=3fc45675")
      .then((response) => {
        addToCart([]);
        toast.success("Checkout Success!");
      })
      .catch(() => toast.error("Failed to Checkout.."));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`cart/${id}?key=3fc45675`)
      .then((response) => {
        addToCart(cartList.filter((cart) => cart.id !== id));
        displayCart();
        toast.warning("Product Remove!");
      })
      .catch(() => toast.error("Failed to Remove Product.."));
  };

  const handleChangeInput = (e) => {
    setQty(e.target.value);
  };

  const updateProduct = (id) => {
    axios
      .put(`cart/?key=3fc45675`, {
        id: id,
        quantity: qty,
      })
      .then((response) => {
        addToCart(response.data);
        toast.success("Product Updated!");
      })
      .catch(() => toast.error("Failed to Update Product.."));
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-outline-info"
        data-toggle="modal"
        data-target="#cartModal"
      >
        View Cart
      </button>

      <div
        className="modal fade"
        id="cartModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header border-bottom-0">
              <h5 className="modal-title" id="exampleModalLabel">
                Your Shopping Cart
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {cartList.length ? (
                <table className="table table-image text-center">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Update</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartList.map((cart) => (
                      <tr key={cart.id}>
                        <td className="w-25">
                          <img
                            src={cart.image}
                            className="img-fluid img-thumbnail"
                            alt="product-cart"
                          />
                        </td>
                        <td className="align-middle">{cart.name}</td>
                        <td className="align-middle">{cart.price}</td>
                        <td className="align-middle">
                          <input
                            type="text"
                            className="form-control"
                            name="quantity"
                            defaultValue={cart.quantity}
                            onChange={handleChangeInput}
                          />
                        </td>
                        <td className="align-middle">
                          {cart.price * cart.quantity}
                        </td>
                        <td className="align-middle">
                          <a
                            className="btn btn-warning btn-sm "
                            onClick={() => updateProduct(cart.id)}
                          >
                            <i className="fa fa-pen"></i>
                          </a>
                        </td>
                        <td className="align-middle">
                          <a
                            className="btn btn-danger btn-sm col-6 align-self-center"
                            onClick={() => deleteProduct(cart.id)}
                          >
                            <i className="fa fa-times"></i>
                          </a>
                        </td>
                        <td className="invisible">
                          {sum.push(cart.price * cart.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>Cart Empty</div>
              )}
              <div className="d-flex justify-content-end">
                <h5>
                  Total:
                  <span className="price text-success">
                    {sum.reduce((a, b) => a + b, 0)}
                  </span>
                </h5>
              </div>
              <div className="modal-footer border-top-0 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                {cartList.length ? (
                  <button
                    type="button"
                    className={"btn btn-success"}
                    onClick={() => cartCheckout()}
                  >
                    Checkout
                  </button>
                ) : (
                  <button type="button" className="btn btn-success" disabled>
                    Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditCart;
