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
            className="relative overflow-hidden p-[2px] rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg"
          >
            <div className="bg-white rounded-2xl p-4 flex items-center justify-between gap-4 hover:scale-[1.01] transition-transform">

              {/* Left Content */}
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-gray-800">
                  {trans.description}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(trans.date).toLocaleDateString() || "Today"}
                </p>
              </div>

              {/* Right Content */}
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
                  className="p-2 rounded-full hover:bg-red-100 transition"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionList;
