import { useEffect, useState } from "react";

import api from "../api/axios";
import DebtForm from "../components/debts/DebtForm";
import DebtList from "../components/debts/DebtList";
import PaymentModal from "../components/payments/PaymentModal";


function Debts(){


    const [debts,setDebts] = useState([]);
    const [error, setError] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [editingDebt, setEditingDebt] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [accounts, setAccounts] = useState([]);
    const [paymentDebt, setPaymentDebt] = useState(null);



    async function fetchDebts(){

        try {
            const response = await api.get("/debts/");
            setDebts(response.data);
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to load debts.");
        }

    }

    async function fetchAccounts(){
        try {
            const response = await api.get("/accounts/");
            setAccounts(response.data);
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to load payment accounts.");
        }
    }

    function openCreateForm() {
        setEditingDebt(null);
        setShowForm(true);
        setError("");
    }

    function openEditForm(debt) {
        setEditingDebt(debt);
        setShowForm(true);
        setError("");
    }

    async function handleSubmit(debtData) {
        setIsSaving(true);
        setError("");
        try {
            if (editingDebt) {
                const response = await api.put(`/debts/${editingDebt.id}`, debtData);
                setDebts((current) => current.map((item) => item.id === editingDebt.id ? response.data : item));
            } else {
                const response = await api.post("/debts/", debtData);
                setDebts((current) => [...current, response.data]);
            }
            setEditingDebt(null);
            setShowForm(false);
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to save debt.");
        } finally {
            setIsSaving(false);
        }
    }

    async function deleteDebt(debt) {
        if (!window.confirm(`Delete ${debt.name}?`)) return;
        try {
            await api.delete(`/debts/${debt.id}`);
            setDebts((current) => current.filter((item) => item.id !== debt.id));
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to delete debt.");
        }
    }

    function cancelForm() {
        setEditingDebt(null);
        setShowForm(false);
    }



    useEffect(()=>{

        fetchDebts();
        fetchAccounts();

    },[]);



    function handlePaymentSuccess() {
        setPaymentDebt(null);
        fetchDebts();
        fetchAccounts();
    }

    function openPaymentModal(debt) {
        setPaymentDebt(debt);
        setError("");
    }

    return (

        <div>

            <div className="mb-6 flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-bold">Debts</h1>
                <p className="mt-1 text-slate-500">Track balances and upcoming obligations.</p>
                </div>
                <button type="button" onClick={openCreateForm} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">+ Add Debt</button>
            </div>

            {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}

            {showForm && <DebtForm key={editingDebt?.id ?? "new-debt"} debt={editingDebt} onSubmit={handleSubmit} onCancel={cancelForm} isSaving={isSaving} />}

            <DebtList debts={debts} onEdit={openEditForm} onDelete={deleteDebt} onPay={openPaymentModal} />

            {paymentDebt && <PaymentModal targetType="debt" targetId={paymentDebt.id} accounts={accounts} onSuccess={handlePaymentSuccess} onClose={() => setPaymentDebt(null)} />}


        </div>

    );

}


export default Debts;