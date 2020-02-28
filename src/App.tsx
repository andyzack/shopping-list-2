import React, { useState, useEffect } from 'react';

import useCustomFetch from './services/useCustomFetch';
import ProductList from './components/ProductList';
import ProductPics from './components/ProductPics';

type AppProps = {
  title: string
}

const pics = Object.values(ProductPics);

function App(props: AppProps) {

  // 1. Use custom hook to fetch data from API url
  const url = 'https://api.jsonbin.io/b/5cae9a54fb42337645ebcad3';
  const [data, loading, hasError] = useCustomFetch(url);

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
          {
            loading? (
              <li className="col-error"><div className="loader"></div></li>
            ) : ""
          }
          {
            !hasError? (
              Object.values(data).map((item: { 
                index: number;
                isSale: boolean;
                isExclusive: boolean;
                price: string;
                productImage: string;
                productName: string;
                size: string;
              }, index) => (
                <li key={index} className="product col-0">
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
