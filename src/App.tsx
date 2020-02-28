import React, { useState, useEffect } from 'react';

import useCustomFetch from './services/useCustomFetch';
import ProductList from './components/ProductList';
import ProductPics from './components/ProductPics';

// Type checking for title
type AppProps = {
  title: string
}

function App(props: AppProps) {

  // 1. Use custom hook to fetch data from API url
  const url = 'https://api.jsonbin.io/b/5cae9a54fb42337645ebcad3';
  const [data, loading, hasError] = useCustomFetch(url);

  // 2. Get Product Pics List, then align to productImage using map func
  const pics = Object.values(ProductPics);

  return (
    <>
      <div className="app">
        <div className="product-header">
          <h1 className="product-title">{props.title}</h1>
          <select
            className="product-filter"
          >
            <option key="1" value="XL">Size XL</option>
          </select>
        </div>
        <div className={"product-container " + (loading? "out" : "in")}>
          <ul>
          // Load Spinner while we fetch data
          {
            loading? (
              <li className="col-error"><div className="loader"></div></li>
            ) : ""
          }

          // Load Product List if there is no errors
          {
            !hasError? (
              Object.values(data).map((item, index) => (
                <li key={item.index} className="product col-0">
                  <ProductList 
                    isSale={item.isSale}
                    isExclusive={item.isExclusive}
                    price={item.price}
                    productImage={pics[index].productImage}
                    productName={item.productName}
                    size={item.size}
                  />
                </li>
              ))
            ) : (
              <li className="col-error">There has been a problem with your fetch operation/API Service!</li>
            )
          }
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
