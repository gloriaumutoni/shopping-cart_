import React,{useState, useEffect} from 'react'
import './style.css'
// import {RxDashboard} from 'react-icons/rx'
// import {LuStretchVertical} from 'react-icons/lu'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export interface Product{
  id:number;
  image:string;
  title:string;
  price:number;
  category:string;
  count:number;
}


const ProductsPage=()=> {
const [search,setSearch]=useState('')
  const handleToast = () => {
  toast('Product Successfully Went To Cart',{
     position: 'top-right',  
      autoClose: 3000,  
      hideProgressBar: true,
  });
     
  };

  const [Products,setProducts]=useState<Product[]>([]);
  useEffect(()=>{
    fetch(' https://fakestoreapi.com/products')
    .then((response)=>response.json())
    .then((data)=>{setProducts(data)})
    .catch((error)=>console.error(error));
  },[])

  const handleAddToCart=(product:Product)=>{
const item:any =localStorage.getItem('product');
let listOfProducts: any=[];
console.log(JSON.parse(item));

listOfProducts =JSON.parse(item);
if(listOfProducts ===null){
  listOfProducts=[];
  listOfProducts.push(product);
}
else{
  let DuplicateCheck = listOfProducts.filter(
    (item: Product)=>item.id === product.id
  );
  console.log(DuplicateCheck);
  if(DuplicateCheck.length < 1){
    listOfProducts.push(product);
  }
  // listOfProducts.push(product);
}
console.log(listOfProducts,product);
localStorage.setItem('product',JSON.stringify(listOfProducts));
  }

  return (
    <div className='product_container'>
        <div>
    <div className='icons'>
      <div>
      <button className='button1'>Filter</button>
      </div>
      <div className='icon'>
        <input className='input'
        type='search'
        placeholder='Search Products'
        onChange={(e)=>setSearch(e.target.value)}
        />
      {/* <RxDashboard/>
<LuStretchVertical/> */}
      </div>
      <div>
    <Link to='/cart'><button className='button2' onClick={handleToast}>Cart</button></Link>  
      </div>
    </div>
      <div className='container'>
{Products.filter((product)=>{
  return search.toLowerCase() === ''
  ?product:product.title.toLowerCase().includes(search);
})
.map((product)=>(
  <div key={product.id} className='product'>
    <div className='color'>
    <Link to='/cart'><img src={product.image} alt={product.title} onClick={()=>handleAddToCart(product)} /></Link> 
    </div>
   
    <h4>{product.title}</h4>
    <h3 className='paragraph1'>{product.category}</h3>
    <p className='paragraph2'>{product.price}Euro</p>
  </div>
))}
      </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ProductsPage










