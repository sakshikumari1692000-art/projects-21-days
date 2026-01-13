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
    <div className="w-full max-w-6xl mx-auto mb-12">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-card border-green-400/40">
          <p>Total Income</p>
          <h2 className="text-green-400">₹{summaryObj.totalIncome || 0}</h2>
        </div>

        <div className="glass-card border-red-400/40">
          <p>Total Expense</p>
          <h2 className="text-red-400">₹{summaryObj.totalExpense || 0}</h2>
        </div>

        <div className="glass-card border-indigo-400/40">
          <p>Total Balance</p>
          <h2 className="text-indigo-400">₹{summaryObj.totalBalance || 0}</h2>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="glass-panel flex justify-center">
        <PieChart width={380} height={380}>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={140}
            innerRadius={80}
          >
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
