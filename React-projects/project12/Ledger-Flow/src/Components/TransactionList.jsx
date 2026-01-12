import React from "react";
import { useLedgerStore } from "../../Store/useLedgerStore";
import { Trash2 } from "lucide-react";

const TransactionList = () => {
    const allTransactions = useLedgerStore((state) => state.transactions);
    const deleteTransaction = useLedgerStore((state) => state.deleteTransaction);

    function handleTransactionDelete(id){
        deleteTransaction(id);
    }

    if(allTransactions.length == 0){
        return <p>No Transaction Yet</p>
    }
    return(
        <div>
            {allTransactions.map((trans)=>{
                return (<div>
                    <p>{trans.description}</p>
                    <p>{trans.date}</p>
                    <p>{trans.amount}</p>
                    <Trash2 size={20} onClick={()=>{
                        handleTransactionDelete(trans.id)
                    }} />
                </div>)
            })}
        </div>
    )
}
export default TransactionList