import { useState } from "react";

import TransactionCard from "./TransactionCard";

function TransactionList({ transactions, accounts, onEdit, onDelete }) {
    const [sortOrder, setSortOrder] = useState("descending");

    if (transactions.length === 0) {
        return <p className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">No transactions recorded yet.</p>;
    }

    const accountNames = Object.fromEntries(accounts.map((account) => [account.id, account.name]));
    const sortedTransactions = [...transactions].sort((first, second) => {
        const firstDate = first.transaction_date || "";
        const secondDate = second.transaction_date || "";
        const dateComparison = firstDate.localeCompare(secondDate);

        if (dateComparison !== 0) {
            return sortOrder === "ascending" ? dateComparison : -dateComparison;
        }

        return sortOrder === "ascending" ? first.id - second.id : second.id - first.id;
    });

    return (
        <div className="rounded-xl bg-white shadow">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                <p className="text-sm font-medium text-slate-600">Transaction history</p>
                <label className="flex items-center gap-2 text-sm text-slate-500">
                    <span>Sort by date</span>
                    <select
                        value={sortOrder}
                        onChange={(event) => setSortOrder(event.target.value)}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        aria-label="Sort transactions by date"
                    >
                        <option value="descending">Newest first</option>
                        <option value="ascending">Oldest first</option>
                    </select>
                </label>
            </div>
            {sortedTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} accountName={accountNames[transaction.account_id]} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default TransactionList;
