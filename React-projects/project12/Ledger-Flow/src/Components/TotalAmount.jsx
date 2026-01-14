import React, { useEffect, useState } from "react";
import { useLedgerStore } from "../../Store/useLedgerStore";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

const TotalAmounts = () => {
  const [summaryObj, setSummaryObj] = useState({});
  const transactions = useLedgerStore((state) => state.transactions);
  const summary = useLedgerStore((state) => state.totalSummary);

  useEffect(() => {
    setSummaryObj(summary());
  }, [transactions]);

  const data = [
    { name: "Income", value: summaryObj.totalIncome || 0 },
    { name: "Expense", value: summaryObj.totalExpense || 0 },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="w-full max-w-7xl mx-auto mb-14">
  
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
  
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
          <p className="text-sm text-gray-400 uppercase tracking-wider">Income</p>
          <h2 className="text-4xl font-bold text-green-600 mt-3">
            ₹ {summaryObj.totalIncome || 0}
          </h2>
        </div>
  
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-100">
          <p className="text-sm text-gray-400 uppercase tracking-wider">Expense</p>
          <h2 className="text-4xl font-bold text-red-500 mt-3">
            ₹ {summaryObj.totalExpense || 0}
          </h2>
        </div>
  
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 shadow-xl text-white">
          <p className="text-sm uppercase tracking-wider opacity-80">Balance</p>
          <h2 className="text-4xl font-bold mt-3">
            ₹ {summaryObj.totalBalance || 0}
          </h2>
        </div>
  
      </div>
  
      {/* Chart Card */}
      <div className="bg-white rounded-3xl shadow-xl p-10 flex justify-center">
        <PieChart width={360} height={360}>
          <Pie data={data} dataKey="value" outerRadius={130} innerRadius={80}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
  
    </div>
  );  
};

export default TotalAmounts;
