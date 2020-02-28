import React from 'react';
import './ProductList.css';

// Type checking for data from API call
type ProductProps = { 
  isSale: boolean,
  isExclusive: boolean,
  price?: string,
  productImage?: string,
  productName: string,
  size?: string,
}

function ProductList({isSale, isExclusive, price, productImage, productName, size}: ProductProps) {
  return (
    <div className="product-card">
      <div className="product-top">
        <div className="product-image">
          <img src={productImage} alt="{productName}" title={productName + " available in "+ size} />
        </div>
      </div>
      <div className="product-bottom">
        <div className="product-banners">
          <div>
          {
            isSale? (
              <span className="product-sale">Sale</span>
            ):''
          }
          </div>
          <div>
          {
            isExclusive? (
              <span className="product-merchandising">Exclusive</span>
            ):''
          }
          </div>
        </div>
        <div className="product-cta">
          <span className="product-name">{productName}</span>
          <span className="product-price">{price}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductList;