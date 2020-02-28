import React from 'react';
import './ProductList.css';

type ProductProps = { 
  isSale: boolean,
  isExclusive: boolean,
  price?: string,
  productImage?: string,
  productName: string,
  size?: string,
}

function ProductList(props: ProductProps) {
  return (
    <div className="product-card">
      <div className="product-top">
        <div className="product-image">
          <img src={props.productImage} title={props.productName} />
        </div>
      </div>
      <div className="product-bottom">
        <div className="product-banners">
          <div>
          {
            props.isSale? (
              <span className="product-sale">Sale</span>
            ):''
          }
          </div>
          <div>
          {
            props.isExclusive? (
              <span className="product-merchandising">Exclusive</span>
            ):''
          }
          </div>
        </div>
        <div className="product-cta">
          <span className="product-name">{props.productName}</span>
          <span className="product-price">price</span>
        </div>
      </div>
    </div>
  )
}

export default ProductList;