import { useEffect, useState } from "react";

import api from "../api/axios";

import TransactionForm from "../components/transactions/TransactionForm";
import TransactionList from "../components/transactions/TransactionList";


function Transactions(){


    const [transactions,setTransactions] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingTransaction, setEditingTransaction] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [isSaving, setIsSaving] = useState(false);



    async function fetchTransactions(){

        try{

            setIsLoading(true);
            setError("");

            const response = await api.get(
                "/transactions/"
            );

            setTransactions(response.data);

        }
        catch(error){

            setError(error.response?.data?.detail || "Unable to load transactions.");

        }

        finally {
            setIsLoading(false);
        }

    }

    async function fetchAccounts(){
        try {
            const response = await api.get("/accounts/");
            setAccounts(response.data);
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to load accounts.");
        }
    }

    function openCreateForm() {
        setEditingTransaction(null);
        setShowForm(true);
        setError("");
    }

    function openEditForm(transaction) {
        setEditingTransaction(transaction);
        setShowForm(true);
        setError("");
    }

    async function handleSubmit(transactionData) {
        try {
            setIsSaving(true);
            setError("");
            if (editingTransaction) {
                const response = await api.put(`/transactions/${editingTransaction.id}`, transactionData);
                setTransactions((current) => current.map((item) => item.id === editingTransaction.id ? response.data : item));
            } else {
                const response = await api.post("/transactions/", transactionData);
                setTransactions((current) => [...current, response.data]);
            }
            setEditingTransaction(null);
            setShowForm(false);
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to save transaction.");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete(transaction) {
        if (!window.confirm(`Delete ${transaction.title}?`)) return;
        try {
            await api.delete(`/transactions/${transaction.id}`);
            setTransactions((current) => current.filter((item) => item.id !== transaction.id));
        } catch (requestError) {
            setError(requestError.response?.data?.detail || "Unable to delete transaction.");
        }
    }

    function cancelForm() {
        setEditingTransaction(null);
        setShowForm(false);
    }



    useEffect(()=>{

        fetchTransactions();
        fetchAccounts();

    },[]);




    return (

        <div>


            <div className="mb-6 flex items-center justify-between">
                <div>
                <h1 className="text-3xl font-bold">Transactions</h1>
                <p className="mt-1 text-slate-500">Keep every income and expense in one place.</p>
                </div>
                <button type="button" onClick={openCreateForm} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">+ Add Transaction</button>
            </div>

            {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}



            {showForm && <TransactionForm key={editingTransaction?.id ?? "new-transaction"} transaction={editingTransaction} accounts={accounts} onSubmit={handleSubmit} onCancel={cancelForm} isSaving={isSaving} />}

            {isLoading ? <p className="text-slate-500">Loading transactions...</p> : <TransactionList transactions={transactions} accounts={accounts} onEdit={openEditForm} onDelete={handleDelete} />}


        </div>

    );

}


export default Transactions;