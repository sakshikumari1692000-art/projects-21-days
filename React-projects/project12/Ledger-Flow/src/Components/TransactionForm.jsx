import { Plus } from "lucide-react";
import React, { useState } from "react";
import {useLedgerStore} from "../../Store/useLedgerStore";
const TransactionForm = () => {
    const addTransaction = useLedgerStore((state)=>state.addTransaction);
    // const allTransactions = useLedgerStore((state)=>state.transactions);
    const [currentTransaction, setCurrentTransaction] = useState({
        description: "",
        amount: 0,
        type: "expense",
    });

    const handleAddTransaction = () => {
      if (currentTransaction.description.trim().length == 0) return;
      if (currentTransaction.amount <= 0) return;
      // THis is to add transacation to the store
      addTransaction({
        description : currentTransaction.description,
        amount : parseFloat(currentTransaction.amount),
        type : currentTransaction.type,
      });
      // Reset the form
      setCurrentTransaction({
        description: "",
        amount: 0,
        type: "expense",
      })
        console.log(useLedgerStore.getState().transactions, "allTransactions");
    }
    return (
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
    
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Transaction
        </h2>
    
        <div className="space-y-5">
    
          <input
            value={currentTransaction.description}
            onChange={(e)=>setCurrentTransaction({...currentTransaction,description:e.target.value})}
            type="text"
            placeholder="Description"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
    
          <input
            value={currentTransaction.amount}
            onChange={(e)=>setCurrentTransaction({...currentTransaction,amount:e.target.value})}
            type="number"
            placeholder="Amount"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
    
          <div className="flex gap-4">
            <button
              onClick={()=>setCurrentTransaction({...currentTransaction,type:"expense"})}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                currentTransaction.type === "expense"
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-600"
              }`}
            >
              Expense
            </button>
    
            <button
              onClick={()=>setCurrentTransaction({...currentTransaction,type:"income"})}
              className={`flex-1 py-3 rounded-xl font-semibold ${
                currentTransaction.type === "income"
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-600"
              }`}
            >
              Income
            </button>
          </div>
    
          <button
            onClick={handleAddTransaction}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition"
          >
            + Add Transaction
          </button>
    
        </div>
      </div>
    );
    
    
};

export default TransactionForm;
