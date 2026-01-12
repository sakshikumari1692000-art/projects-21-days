import React from "react";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";

const App = () =>{
  return(
    <div>
       <TransactionForm />
       <TransactionList />
    </div>
  )
}
export default App;