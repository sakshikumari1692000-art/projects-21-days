import { Plus } from "lucide-react";
import React, { useState } from "react";

const TransactionForm = () => {
    const [currentTransaction, setCurrentTransaction] = useState({
        description: "",
        amount: 0,
        type: "expense",
    });

    const handleAddTransaction = () => {
        console.log(currentTransaction, "currentTransaction");
    }
  return (
    <div className="w-full max-w-md mx-auto p-[2px] rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl">
      <div className="bg-white rounded-3xl p-7 space-y-6">

        <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          New Transaction
        </h2>

        {/* Description */}
        <div className="relative">
          <input
            onChange = {(event) => {
                setCurrentTransaction({
                    ...currentTransaction,
                    description: event.target.value,
                })
            }}
            type="text"
            id="des"
            name="des"
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-2 bg-transparent border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition"
          />
          <label
            htmlFor="des"
            className="absolute left-4 top-2 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600 transition-all"
          >
            Description
          </label>
        </div>

        {/* Amount */}
        <div className="relative">
          <input
            onChange = {(event) => {
                setCurrentTransaction({
                    ...currentTransaction,
                    amount: event.target.value,
                })
            }}
            type="number"
            id="amount"
            name="amount"
            placeholder=" "
            className="peer w-full px-4 pt-6 pb-2 bg-transparent border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-0 outline-none transition"
          />
          <label
            htmlFor="amount"
            className="absolute left-4 top-2 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600 transition-all"
          >
            Amount (₹)
          </label>
        </div>

        {/* Type */}
        <div className="grid grid-cols-2 gap-4">
          <label
            htmlFor="expense"
            className="cursor-pointer flex items-center justify-center gap-2 border-2 border-red-200 rounded-xl py-3 text-red-600 font-semibold hover:bg-red-50 transition"
          >
            <input
             onChange = {() => {
                setCurrentTransaction({
                    ...currentTransaction,
                    type: "expense",
                })
            }}
              id="expense"
              type="radio"
              name="type"
              value="expense"
              className="accent-red-500"
            />
            Expense
          </label>

          <label
            htmlFor="income"
            className="cursor-pointer flex items-center justify-center gap-2 border-2 border-green-200 rounded-xl py-3 text-green-600 font-semibold hover:bg-green-50 transition"
          >
            <input
            onChange = {() => {
                setCurrentTransaction({
                    ...currentTransaction,
                    type: "income",
                })
            }}
              id="income"
              type="radio"
              name="type"
              value="income"
              className="accent-green-500"
            />
            Income
          </label>
        </div>

        {/* Button */}
        <button onClick={handleAddTransaction} className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-3 rounded-xl font-bold tracking-wide shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform">
          <span className="absolute inset-0 bg-white/20 blur-xl opacity-0 hover:opacity-100 transition"></span>
          <span className="relative flex items-center justify-center gap-2">
            <Plus size={18} />
            Add Transaction
          </span>
        </button>

      </div>
    </div>
  );
};

export default TransactionForm;
