import React from "react";
import { useLedgerStore } from "../../Store/useLedgerStore";
import { Trash2 } from "lucide-react";

const TransactionList = () => {
  const allTransactions = useLedgerStore((state) => state.transactions);
  const deleteTransaction = useLedgerStore((state) => state.deleteTransaction);

  function handleTransactionDelete(id) {
    deleteTransaction(id);
  }

  if (allTransactions.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto mt-6 p-6 text-center rounded-2xl border border-dashed border-gray-300 text-gray-500">
        No transactions yet ✨
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-4">
      {allTransactions.map((trans) => {
        const isIncome = trans.type === "income";
  
        return (
          <div
            key={trans.id}
            className="bg-white rounded-2xl shadow-lg px-5 py-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-800">
                {trans.description}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(trans.date).toLocaleDateString()}
              </p>
            </div>
  
            <div className="flex items-center gap-4">
              <p
                className={`font-bold text-lg ${
                  isIncome ? "text-green-600" : "text-red-500"
                }`}
              >
                {isIncome ? "+" : "-"}₹{trans.amount}
              </p>
  
              <button
                onClick={() => handleTransactionDelete(trans.id)}
                className="p-2 rounded-full hover:bg-red-100"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
  
};

export default TransactionList;
