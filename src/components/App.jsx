import React, {useState} from "react";
import axios from "axios";

const App = () => {
   const [transactionData,setTransactionData] = useState({
      purchase: "",
      price: "",
      date: "",
      description: ""
   });
   
   const handleChange = (event) => {
      const {name, value} = event.target
      setTransactionData({
         ...transactionData,
         [name]: value
      })
   }
   
   const addNewTransaction = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post("http://localhost:3001/transaction", transactionData);
      } catch (error) {
         console.error(error)
      }     
   }

return (
<main>
<h1>$400<span>.00</span></h1>
<form onSubmit={addNewTransaction}>


<div className="purchase">
<input 
name="purchase"
value={transactionData.expence}
onChange={handleChange} 
type="text" placeholder={"Your Purchase"}
required 
/>
</div>

<div className="basic">
<input type="number" name="price" value={transactionData.price} onChange={handleChange} placeholder={"Price"} required/>
<input 
name="date"
value={transactionData.date}
onChange={handleChange}  
type="datetime-local"
required 
/>
</div>

<div className="dis">
<input 
name="description"
value={transactionData.description}
onChange={handleChange} 
type="text" 
placeholder={"Description"}
/>
</div>
<button type="submit">Add new Transaction</button>                                
</form>
<div className="transactions">
 <div className="transaction">
   <div className="left">
   <div className="name">Motor bike's wheel</div>
   <div className="description">It was a big one</div>
   </div>
   <div className="right">
      <div className="price red">-$500</div>
      <div className="dateTime">2023-12-27 18:40</div>
   </div>
 </div>  
 <div className="transaction">
   <div className="left">
   <div className="name">New LG Tv</div>
   <div className="description">It was a big one</div>
   </div>
   <div className="right">
      <div className="price red">-$400</div>
      <div className="dateTime">2023-12-27 18:40
      </div>
   </div>
 </div>  
 <div className="transaction">
   <div className="left">
   <div className="name">Deposited in Bank</div>
   <div className="description">It was a big one</div>
   </div>
   <div className="right">
      <div className="price green">+$500</div>
      <div className="dateTime">2023-12-27 18:40
      </div>
   </div>
 </div>  
</div>
</main>
)
}

export default App;