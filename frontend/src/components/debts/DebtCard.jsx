import { CircleDollarSign, Pencil, Trash2 } from "lucide-react";

function DebtCard({ debt, onEdit, onDelete, onPay }) {
    const isPaid = debt.status.toLowerCase() === "paid";

    return (
        <div className="border-b border-slate-100 p-5 last:border-b-0">
            <div className="flex items-start justify-between gap-4">
                <div><h2 className="font-semibold text-slate-800">{debt.name}</h2><p className="mt-1 text-sm text-slate-500">Due {debt.due_date}</p></div>
                <div className="flex items-center gap-2"><span className={`rounded-full px-3 py-1 text-xs font-medium ${isPaid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{isPaid ? "Paid" : "Active"}</span><button type="button" onClick={() => onEdit(debt)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600" aria-label={`Edit ${debt.name}`} title="Edit debt"><Pencil size={17} /></button><button type="button" onClick={() => onDelete(debt)} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Delete ${debt.name}`} title="Delete debt"><Trash2 size={17} /></button></div>
            </div>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-4"><div><p className="text-slate-500">Original Amount</p><p className="mt-1 font-semibold">₱{Number(debt.original_amount).toLocaleString()}</p></div><div><p className="text-slate-500">Paid</p><p className="mt-1 font-semibold text-emerald-600">₱{Number(debt.paid_amount).toLocaleString()}</p></div><div><p className="text-slate-500">Remaining</p><p className="mt-1 font-semibold text-amber-600">₱{Number(debt.remaining_amount).toLocaleString()}</p></div><div><p className="text-slate-500">Monthly Payment</p><p className="mt-1 font-semibold">₱{Number(debt.monthly_payment).toLocaleString()}</p></div></div>
            {!isPaid && <button type="button" onClick={() => onPay(debt)} className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"><CircleDollarSign size={17} /> Pay</button>}
        </div>
    );
}

export default DebtCard;
