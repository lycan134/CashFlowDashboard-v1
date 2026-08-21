import TransactionCard from "./TransactionCard";

function TransactionList({ transactions, accounts, onEdit, onDelete }) {
    if (transactions.length === 0) {
        return <p className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">No transactions recorded yet.</p>;
    }

    const accountNames = Object.fromEntries(accounts.map((account) => [account.id, account.name]));

    return (
        <div className="rounded-xl bg-white shadow">
            {transactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} accountName={accountNames[transaction.account_id]} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default TransactionList;
