import React, { useState, useEffect } from 'react';

import useCustomFetch from './services/useCustomFetch';
import ProductList from './components/ProductList';
import ProductPics from './components/ProductPics';
//import ProductMenu from './components/ProductMenu';

// Type checking for title
type AppProps = {
  title: string
}

function App(props: AppProps) {

  // 1. Use custom hook to fetch data from API url https://api.jsonbin.io/b/5e58c93109ac43054813a160
  const url = 'https://api.myjson.com/bins/nl8t8';
  const [data, loading, hasError] = useCustomFetch(url);

  // 2. Get Product Pics List, then align to productImage using map function
  const pics = Object.values(ProductPics);

  // 3a. Use the dress selected state variable
  const [dressSize, setDressSize] = useState('');

  // 3b. Use the data selected state variable
  let [dataSelected, setDataSelected] = useState([]);

  // 3b. Use the data selected state variable
  let dataSizes = Object.values(data) 
  .map(item => item.size)
  .reduce((prev, next) => [...prev, ...next], [])

  dataSizes = dataSizes.filter((a:any, b:any) => dataSizes.indexOf(a) === b)

  // 4. Helper function to handle menu change
  function handleChange(val:any, data:any) {
    setDressSize(val)
    const dataFiltered = data.filter((item: { size: string | any[]; }) => item.size.includes(val));
    setDataSelected(Object.values(dataFiltered));
  }

  return (
    <>
      <div className="app">
        <div className="product-header">
          <h1 className="product-title">{props.title}</h1>
          <select
            className="product-filter"
            value={dressSize}
            onChange={(e) => {handleChange(e.target.value, data)}}
          >
            <option value="">Filter by size</option>
            {
              Object.values(dataSizes).map((item:string, index) => (
                <option key={index} value={item}>Size {item}</option>
              ))
            }
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
              Object.values(dataSelected.length? dataSelected : data).map((item, index) => (
                <li key={item.index} className={"product col-"+dataSelected.length}>
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
