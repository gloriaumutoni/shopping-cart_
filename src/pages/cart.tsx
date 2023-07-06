import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  count: number;
  category: string;
}

function Cart() {
  const [CartProducts, setCartProducts] = useState<Product[]>([]);
  const [ItemNumber] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [search,setSearch]=useState('')

  const DisplayCart = () => {
    const item: any = localStorage.getItem('product');
    setCartProducts(JSON.parse(item));
  };

  useEffect(() => {
    DisplayCart();
  }, []);

  useEffect(() => {
   
    const cartTotal = CartProducts.reduce(
      (accumulator, product) => accumulator + product.price * product.count ,
      0
    );
    setTotal(cartTotal);
  }, [CartProducts]);

  const removeCartItems = (ItemId: number) => {
    const item: any = localStorage.getItem('product');
    let listOfProducts: any = [];

    listOfProducts = JSON.parse(item);
    let remainingProduct = [];
    if (listOfProducts != null) {
      remainingProduct = listOfProducts.filter((item: Product) => item.id !== ItemId);
      localStorage.setItem('product', JSON.stringify(remainingProduct));
      DisplayCart();
    }
  };

  const incrementProducts = (ItemId: number) => {
    const item: any = localStorage.getItem('product');
    let listOfProducts: any = [];

    listOfProducts = JSON.parse(item);
    let getNewList: any = [];
    if (listOfProducts !== null) {
      for (let item of listOfProducts) {
        if (item.id === ItemId) {
          let currentCount = item?.count || 1;
          item.count = Number(currentCount) + 1;
        }
        getNewList.push(item);
      }
      localStorage.setItem('product', JSON.stringify(getNewList));
      DisplayCart();
    }
  };

  const decrementProduct = (ItemId: number) => {
    const item: any = localStorage.getItem('product');
    let listOfProducts: any = [];

    listOfProducts = JSON.parse(item);
    let getNewList: any = [];
    if (listOfProducts !== null) {
      for (let item of listOfProducts) {
        if (item.id === ItemId) {
          let currentCount = item?.count || 1;
          if (currentCount === 1) {
            removeCartItems(ItemId);
            return;
          }
          item.count = Number(currentCount) - 1;
        }
        getNewList.push(item);
      }
      localStorage.setItem('product', JSON.stringify(getNewList));
      DisplayCart();
    }
  };

  return (
    <div className="body">
      <div className="cart_container">
        <div className="arrow">
          {/* <button>Products</button> */}
          </div>
          <div className='search-input'>
          <input 
        type='search'
        placeholder='Search Products'
        onChange={(e)=>setSearch(e.target.value)}
        />
          </div>
         
        <div className="grid">
          <div className="cart">
            <div>
              <p className="lline">Cart</p>
              <div className="line"></div>
              {CartProducts.filter((product)=>{
  return search.toLowerCase() === ''
  ?product:product.title.toLowerCase().includes(search);
}).map((product) => (
                <div key={product.id} className="cart_display">
                  <img src={product.image} alt={product.title} onClick={() => removeCartItems(product.id)} />
                  <div className="middle">
                    


                      <div className="flex">
                        <h4>{product.title}</h4>
                        <p className="paragraph">${product.price}</p>
                      </div>
                      <p className="paragraph3">${(product?.count || 1) * product?.price}</p>
                      <div className="whole">
                        <div className="buttons">
                          <button onClick={() => decrementProduct(product.id)}>-</button>
                          <span>{product?.count || ItemNumber}</span>
                          <button onClick={() => incrementProducts(product.id)}>+</button>
                        </div>
                        <div className="delete">
                          <button onClick={() => removeCartItems(product.id)}>
                            <span>
                              <MdDelete />
                            </span>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>



            

            <div className="deliver">
              <p className="p">Delivery</p>
              <div className="category1">
                <button className="button1">Free</button>
                <p>Express:$9.99</p>
              </div>
              <div className="category2">
                <p>Total</p>
                <h4>${total}</h4> {/* Display the calculated total here */}
              </div>
              <div className="category3">
                <button className="button2">Proceed to Checkout</button>
                <br></br>
                <Link to="/">
                  <button className="button3">Continue Shopping</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  );
}

export default Cart;
