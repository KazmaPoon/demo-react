import React, { useState, useEffect } from 'react'
import style from './ProductList.module.css'
import {Link} from 'react-router-dom'
import QuantityBtn from './QuantityBtn'
import Title from './Title'
//import {useState} from 'react' //React Hook

export default function ProductList() {
  let [productList,setProductList] = useState([])
  let [input , setInput] = useState('')

//useEffect
useEffect(()=>{
  //1 : 無第二個參數 : component每次render都會觸發
  //2 : Dependency Array是空array時 : 只會在第一次網頁render時會觸發
  //3 : Dependency Array是有變數時 : 第一次網頁render時 + 指定的變數改變 會觸發
  fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
      .then(response => response.json())
      .then(data => setProductList(data))
      
  console.log(productList)
},[]) // <==  Dependency Array

useEffect(()=>{
  if(input.length>4)
      console.log('字串夠長')
  else
      console.log('字串太短')
},[input])

 /*  const [showProduct,setshowProduct] = React.useState(false) */


  return (
      /* {product}<button onClick={handleClick}>Change the word</button>
      {showProduct && <button onClick={()=>{setshowProduct(false)}}>hide the product</button>
      !showProduct && <button onClick={()=>{setshowProduct(true)}}>show the product</button>} */
      <>
        <Title mainTitle='Please select 水果'/>

        <div className="container">
          {
            /* showProduct && */ productList.map(product=>(
                        <React.Fragment key={product.id}>

                        <div className="containerItem">
                            <Link to={'/product/'+product.id}>
                                <img src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name} />
                            </Link>

                            <div className="productName">
                                {product.name}  -  {product.price}元/件
                            </div>
            
                            <QuantityBtn productInfo={product} />
                        </div>

                    </React.Fragment>
                ))
            }
        </div>
    </>
)
}
