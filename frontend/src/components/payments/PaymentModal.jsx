import { useState } from "react";
import api from "../../api/axios";

function PaymentModal({ targetType, targetId, accounts, onSuccess, onClose }) {
    const [amount, setAmount] = useState("");
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
    const [sourceAccountId, setSourceAccountId] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setIsSaving(true);
        setError("");

        try {
            await api.post("/payments/", {
                amount: Number(amount),
                payment_date: paymentDate,
                source_account_id: Number(sourceAccountId),
                ...(targetType === "debt" ? { debt_id: targetId } : { account_id: targetId })
            });
            onSuccess();
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to process payment.");
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-slate-800">Make Payment</h2>
                    <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-800" aria-label="Close payment modal">×</button>
                </div>
                <div className="mt-5 space-y-4">
                    <input type="number" min="0.01" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Amount" required className="w-full rounded-lg border border-slate-200 p-3" />
                    <input type="date" value={paymentDate} onChange={(event) => setPaymentDate(event.target.value)} required className="w-full rounded-lg border border-slate-200 p-3" />
                    <select value={sourceAccountId} onChange={(event) => setSourceAccountId(event.target.value)} required className="w-full rounded-lg border border-slate-200 p-3">
                        <option value="" disabled>Pay from account</option>
                        {accounts.filter((account) => account.id !== targetId && account.type !== "credit_card").map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}
                    </select>
                </div>
                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700">Cancel</button>
                    <button type="submit" disabled={isSaving} className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50">{isSaving ? "Processing..." : "Confirm Payment"}</button>
                </div>
            </form>
        </div>
    );
}

export default PaymentModal;
