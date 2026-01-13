import React from "react";
import TransactionForm from "./Components/TransactionForm";
import TransactionList from "./Components/TransactionList";
import TotalAmount from "./Components/TotalAmount";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">

      {/* TOP – Total Summary */}
      <TotalAmount />

      {/* BOTTOM – Form + List */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <div className="flex justify-center">
          <TransactionForm />
        </div>

        <div className="flex justify-center">
          <TransactionList />
        </div>
      </div>

    </div>
  );
};

export default App;
