import { Pencil, Trash2 } from "lucide-react";

function TransactionCard({ transaction, accountName, onEdit, onDelete }) {
    const isIncome = transaction.type === "income";

    return (
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5 last:border-b-0">
            <div className="min-w-0">
                <h2 className="truncate font-semibold text-slate-800">{transaction.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{transaction.category} · {accountName || "Account unavailable"}</p>
                <p className="mt-1 text-xs text-slate-400">
                    {transaction.transaction_date ? new Date(`${transaction.transaction_date}T00:00:00`).toLocaleDateString() : "Date unavailable"}
                </p>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className={isIncome ? "font-semibold text-emerald-600" : "font-semibold text-red-600"}>
                        {isIncome ? "+" : "-"}₱{Number(transaction.amount).toLocaleString()}
                    </p>
                    <p className="text-xs capitalize text-slate-400">{transaction.type}</p>
                </div>
                <div className="flex gap-1">
                    <button type="button" onClick={() => onEdit(transaction)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label={`Edit ${transaction.title}`} title="Edit transaction">
                        <Pencil size={17} />
                    </button>
                    <button type="button" onClick={() => onDelete(transaction)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${transaction.title}`} title="Delete transaction">
                        <Trash2 size={17} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransactionCard;
