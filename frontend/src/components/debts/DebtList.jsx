import DebtCard from "./DebtCard";

function DebtList({ debts, onEdit, onDelete, onPay }) {
    if (debts.length === 0) return <p className="rounded-xl bg-white p-6 text-center text-slate-500 shadow">No debts recorded yet.</p>;
    return <div className="rounded-xl bg-white shadow">{debts.map((debt) => <DebtCard key={debt.id} debt={debt} onEdit={onEdit} onDelete={onDelete} onPay={onPay} />)}</div>;
}

export default DebtList;
