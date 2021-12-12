import React, { useEffect } from "react";
import { fetchProducts, fetchProduct } from "./productsSlice";
import { addToCart } from "../cart/cartSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from "./Products.module.css";

export function Products() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const state = useAppSelector((state) => state.products);
  return (
      <main className="page">
        <ul className={styles.products}>
          {state.products.map((product, id) => (
            <li key={product.name}>
              <article className={styles.product}>
                <figure>
                  <img
                    src={product.imageURL}
                    alt="no-image"
                    style={{ width: 100 }}
                  />
                </figure>
                <div>
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  <p>${product.price}</p>
                  <button onClick={() => dispatch(addToCart(id))}>
                    Add to Cart 🛒
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </main>
  );
}
