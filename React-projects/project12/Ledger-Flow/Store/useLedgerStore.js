import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

//useLedgerStore is a custom hook that we creates a store for managing ledger transactions and use it anywhere 
export const useLedgerStore = create((set) => ({
  transactions:[],
  addTransaction: (transaction) => set((state) => ({ 
    transactions: [{ id : uuidv4() , date : new Date().toISOString() , ...transaction}, ...state.transactions] 
  })),  // transaction is new one and transactions are old (s)
  deleteTransaction: (id) =>  set((state) => ({ transactions: state.transactions.filter((tObj) => tObj.id !== id) })),
}))


// 
// transactions = {
//   id : uniqueId,
//     date : newDate(),
//     description : "",
//     amount : "",
//     type :  "expense" | "income",
//  }