import { useState } from "react";

const emptyDebt = { name: "", original_amount: "", remaining_amount: "", paid_amount: 0, monthly_payment: "", due_date: "", status: "Active" };

function DebtForm({ debt, onSubmit, onCancel, isSaving }) {
    const [formData, setFormData] = useState(debt || emptyDebt);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit({ ...formData, amount: Number(formData.amount), paid_amount: Number(formData.paid_amount) });
    }

    return <form onSubmit={handleSubmit} className="mb-6 rounded-xl bg-white p-5 shadow"><h2 className="mb-4 text-lg font-semibold text-slate-800">{debt ? "Edit debt" : "Add debt"}</h2><div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4"><input name="name" value={formData.name} onChange={handleChange} placeholder="Debt name" required className="rounded-lg border p-3" /><input name="original_amount" value={formData.original_amount} onChange={handleChange} type="number" min="0" step="0.01" placeholder="Original amount" required className="rounded-lg border p-3" /><input name="monthly_payment" value={formData.monthly_payment} onChange={handleChange} type="number" min="0.01" step="0.01" placeholder="Monthly payment" required className="rounded-lg border p-3" /><input name="paid_amount" value={formData.paid_amount} onChange={handleChange} type="number" min="0" step="0.01" placeholder="Paid amount" required className="rounded-lg border p-3" /><input name="remaining_amount" value={formData.remaining_amount} onChange={handleChange} type="number" min="0" step="0.01" placeholder="Remaining amount" required={Boolean(debt)} disabled={!debt} className="rounded-lg border p-3 disabled:bg-slate-50" /><input name="due_date" value={formData.due_date} onChange={handleChange} type="date" required className="rounded-lg border p-3" /><select name="status" value={formData.status} onChange={handleChange} className="rounded-lg border p-3"><option value="Active">Active</option><option value="Paid">Paid</option></select></div><div className="mt-4"><button type="submit" disabled={isSaving} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50">{isSaving ? "Saving..." : debt ? "Update debt" : "Save debt"}</button>{debt && <button type="button" onClick={onCancel} className="ml-3 rounded-lg border border-slate-300 px-4 py-2 text-slate-700">Cancel</button>}</div></form>;
}

export default DebtForm;
