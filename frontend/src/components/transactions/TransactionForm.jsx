import { useEffect, useState } from "react";

const today = new Date().toISOString().slice(0, 10);
const emptyTransaction = { title: "", amount: "", type: "expense", category: "General", account_id: "", transaction_date: today };

const categoriesByType = {
    expense: [
        "Utilities",
        "Groceries",
        "Food & Dining",
        "Transportation",
        "Fuel",
        "Shopping",
        "Entertainment",
        "Health",
        "Education",
        "Bills",
        "Rent",
        "Insurance",
        "Loan Payment",
        "Investment",
        "Travel",
        "Others"
    ],
    income: [
        "Salary",
        "Allowance",
        "Bonus",
        "Business",
        "Freelance",
        "Interest",
        "Investment",
        "Gift",
        "Refund",
        "Others"
    ]
};

function TransactionForm({ transaction, accounts, onSubmit, onCancel, isSaving }) {
    const [formData, setFormData] = useState(transaction ? { ...transaction, account_id: String(transaction.account_id) } : emptyTransaction);

    useEffect(() => {
        if (!transaction && accounts.length > 0 && !formData.account_id) {
            setFormData((current) => ({ ...current, account_id: String(accounts[0].id) }));
        }
    }, [accounts, formData.account_id, transaction]);

    function handleChange(event) {
        const { name, value } = event.target;

        if (name === "type") {
            setFormData((current) => ({
                ...current,
                type: value,
                category: categoriesByType[value].includes(current.category) ? current.category : ""
            }));
            return;
        }

        setFormData((current) => ({ ...current, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit({ ...formData, amount: Number(formData.amount), account_id: Number(formData.account_id) });
    }

    return (
        <form onSubmit={handleSubmit} className="mb-6 rounded-xl bg-white p-5 shadow">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">{transaction ? "Edit transaction" : "Add transaction"}</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
                <input name="title" value={formData.title} onChange={handleChange} placeholder="Description" required className="rounded-lg border border-slate-200 p-3" />
                <input name="amount" value={formData.amount} onChange={handleChange} type="number" min="0" step="0.01" placeholder="Amount" required className="rounded-lg border border-slate-200 p-3" />
                <input name="transaction_date" value={formData.transaction_date || ""} onChange={handleChange} type="date" required className="rounded-lg border border-slate-200 p-3" />
                <select name="type" value={formData.type} onChange={handleChange} className="rounded-lg border border-slate-200 p-3"><option value="expense">Expense</option><option value="income">Income</option></select>
                <select name="category" value={formData.category} onChange={handleChange} required className="rounded-lg border border-slate-200 p-3">
                    <option value="" disabled>Select category</option>
                    {categoriesByType[formData.type].map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select name="account_id" value={formData.account_id} onChange={handleChange} required className="rounded-lg border border-slate-200 p-3"><option value="" disabled>Select account</option>{accounts.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}</select>
            </div>
            <div className="mt-4">
                <button type="submit" disabled={isSaving || accounts.length === 0} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50">{isSaving ? "Saving..." : transaction ? "Update transaction" : "Save transaction"}</button>
                {transaction && <button type="button" onClick={onCancel} className="ml-3 rounded-lg border border-slate-300 px-4 py-2 text-slate-700">Cancel</button>}
            </div>
        </form>
    );
}

export default TransactionForm;
