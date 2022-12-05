import "./App.css";
import { useState } from "react";
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem.js";
import React from "react";

/* ####### DO NOT TOUCH -- this makes the image URLs work ####### */
bakeryData.forEach((item) => {
});
/* ############################################################## */
 
function App() {
  // TODO: use useState to create a state variable to hold the state of the Cart
  /* add your Cart state code here */
  const [Cart, setCart] = useState([])
  const [price, setPrice] = useState(0)
  const [inventory, setInventory] = useState([])
  const [type, setType] = useState("All");
  const [tastyStatus, setTastyStatus] = useState(2)
  const [roundStatus, setRoundStatus] = useState(2)
  const [currentData, setCurrentData] = useState(bakeryData)
  const sortedData = sorted(bakeryData.slice())
  const [priceStatus, setPriceStatus] = useState(2)

  function sortItems(){
    setPriceStatus(priceStatus + 1)
    if ((priceStatus % 2) === 0){
        setCurrentData(sorted(currentData))
    } else {
        setCurrentData(unsorted(currentData))
    }
  }

  function sorted(dataList) {
      dataList.sort((a, b) => {
        return (a.price < b.price) ? -1 : (a.price > b.price) ? 1 : 0;
      })
    return dataList
  }

  function unsorted(dataList) {
    dataList.sort((a, b) => {
      return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
    })
  return dataList
}

  function checkInput(inputBox){
    if (inputBox==="round"){
      if (((roundStatus % 2)!==0) && ((tastyStatus % 2)===0)){
        setType("None")
        //switched to All
        filterItems("All")
      } else if (((roundStatus % 2)!==0) && ((tastyStatus % 2)!==0)){
        setType("Tasty")
        //switched to Tasty
        filterItems("Tasty")
      } else if (((roundStatus % 2)===0) && ((tastyStatus % 2)===0)){
        setType("All")
        //switched to Round
        filterItems("Round")
      } else {
        setType("Round")
        //switched to None
        filterItems("None")
      }  
        setRoundStatus(roundStatus + 1)
      } else if (inputBox==="tasty"){
      if (((roundStatus % 2)===0) && ((tastyStatus % 2)!==0)){
        setType("All")
        //switched to All
        filterItems("All")
      } else if (((roundStatus % 2)===0) && ((tastyStatus % 2)===0)){
        setType("Tasty")
        //switched to Tasty
        filterItems("Tasty")
      } else if (((roundStatus % 2)!==0) && ((tastyStatus % 2)!==0)){
        setType("Round")
        //switched to Round
        filterItems("Round")
      } else {
        setType("None")
        //switched to none
        filterItems("None")
      }  
        setTastyStatus(tastyStatus + 1)
    }
  }

  function filterItems(filter){
    if ((priceStatus % 2) == 0) {
    if (filter === "Round"){
      setCurrentData(bakeryData.filter((item) => item.isRound === true))
    } else if (filter === "Tasty"){
      setCurrentData(bakeryData.filter((item) => item.isTasty === true))
    } else if (filter === "All") {
      setCurrentData(bakeryData)
    } else {
      setCurrentData(bakeryData.filter((item) => ((item.isTasty === true) && (item.isRound === true))))
    }
  } else{
    if (filter === "Round"){
      setCurrentData(sortedData.filter((item) => item.isRound === true))
    } else if (filter === "Tasty"){
      setCurrentData(sortedData.filter((item) => item.isTasty === true))
    } else if (filter === "All") {
      setCurrentData(sortedData)
    } else {
      setCurrentData(sortedData.filter((item) => ((item.isTasty === true) && (item.isRound === true))))
    }
  }
  }

  function addToCart(item, price, id){
    setCart([...Cart, item + " $" + price])
    totalPrice(price);
    setInventory([...inventory, id])
  }

  function totalPrice(toAdd){
    setPrice(price + toAdd);
  }

  function lowerPrice(toAdd){
    setPrice(price - toAdd);
  }

  function remove(removeId, price){
    const toRemove = (i) => i === removeId
    let idx = inventory.findIndex(toRemove)
    if (idx !== -1){
    setCart((i) =>
    i.filter((_, index) => index !== idx)
    );  
    setInventory((i) =>
    i.filter((_, index) => index !== idx)
    );  
    lowerPrice(price)
    }
  }

  function reset(){
      setCart((current) =>
        current.filter((item) => item === 'Zebra')
      );  
      setPrice(0)
      setInventory((curr) =>
        curr.filter((item) => item === 'Zebra')
      );  
    }

  return (
    <div className="App">
      <h1>My Bakery</h1> {}

      <div className="filters">
        <h3>Sort By Price?</h3>
        <div className="products">
        <div className="productInput">
          <input onClick={ () =>{sortItems()}} type="checkbox" id="sortPrice"/>
            <div className="inputBefore"></div>
            <div className="inputAfter"></div>
        </div>
        <label for="sortPrice">
         Sort by Price
        </label>
        </div>

        <h3>Filters:</h3>
        <div className="products">
        <div className="productInput">
          <input onClick={ () =>{checkInput("tasty")}} type="checkbox" id="tasty"/>
            <div className="inputBefore"></div>
            <div className="inputAfter"></div>
        </div>
        <label for="tasty">
          Tastes Good
        </label>
        </div>
        <div className="products">
        <div className="productInput">
          <input onClick={ () =>{checkInput("round")}} type="checkbox" id="round"/>
            <div className="inputBefore"></div>
            <div className="inputAfter"></div>
        </div>
        <label for="Round">
          Round
        </label>
        </div>
      </div>

      {currentData?.map((item, index) => ( // TODO: map bakeryData to BakeryItem components
        <BakeryItem removeItem ={remove} id = {item.id} name={item.name} desc={item.description} price={item.price} image={item.image} addItemToCart={addToCart}/>
      ))}

      <div class="cart">
        <h2>Cart</h2>
        <ul>
        {Cart.map((item) => (
          <li>{item}</li>
        ))}
        </ul>
        <h3>Total Price: ${price.toFixed(2)}</h3>
        <button class="reset" onClick={() =>{
          reset();
        }}>Reset Cart</button>
      </div>
    </div>
  );
}
export default App;
