import React, {useEffect, useState} from "react";
import axios from "axios";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const App = () => {
   const [transactionData,setTransactionData] = useState({
      purchase: "",
      price: "",
      date: "",
      description: ""
   });

   const [transactions, setTransactions] = useState([]);

   const [init, setInit] = useState('');

   const style = () => {
      transactionData.price.charAt(0) === "-" ? setInit("-") 
      : transactionData.price.charAt(0) === "+" ? setInit("+")
      : setInit('');
   }

   const reverseStyle = () => {
      setInit('');
   }

   useEffect(() => {
      const fetachData = async () => {
         try {
            const response = await axios.get("http://localhost:3001/transactions");
            setTransactions(response.data);
         } catch (error) {
            console.error(error);
         }
      };
      fetachData();
   },[])
   
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
         setTransactions([
            ...transactions,
            response.data
         ])
         setTransactionData({
            purchase: "",
            price: "",
            date: "",
            description: ""
         })
      } catch (error) {
         console.error(error)
      }     
   }

   const deleteTransactionData = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/transactions/${id}`);
    setTransactions(transactions.filter((transaction) => transaction._id !== id));
  } catch (error) {
    console.error(error);
  }
};

const formateDate = (formDate) => {
   const date = new Date(formDate);
   return date.toLocaleDateString();
}

   let balance = 0;

   for (const transaction of transactions) {
      balance = balance + transaction.price
   }

   balance = balance.toFixed(2);
   const fraction = balance.split('.')[1];
   balance = balance.split('.')[0];

return (
<main>
<h1>{balance}<span>{fraction}</span>৳</h1>
<form onSubmit={addNewTransaction}>


<div className="purchase">
<input 
name="purchase"
value={transactionData.purchase}
onChange={handleChange} 
type="text" placeholder={"Your source of gain or loss"}
required 
/>
</div>

<div className="basic">
<input type="text" name="price" value={transactionData.price} onChange={handleChange} placeholder={"Price with (+ or -)"} required/>
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
<button type="submit" onMouseOver={style} onMouseOut={reverseStyle} className={init === '-' ? "red-background text-white"
: init === '+' ? "green-background text-white"
: ''
}>Add new Transaction</button>

</form>
<div className="transactions">
 <div>
   {transactions.length > 0 && transactions.map((transaction, index) => (
   <div className="transaction" id={index}>
   <div className="left">
   <div className="name">{transaction.purchase}</div>
   <div className="description">{transaction.description}</div>
   </div>
   <div className="right">
      <div className={"price " + (transaction.price > 0 ? 'green' : 'red') }>{transaction.price + "৳"}</div>
      <div className="dateTime">{formateDate(transaction.date)}</div>
      <button type="button" onClick={() => deleteTransactionData(transaction._id)}><DeleteForeverIcon className="icon" /></button>
   </div>
   </div>   
    ))}
 </div>
</div>
</main>
)
}

export default App;