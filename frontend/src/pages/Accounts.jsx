import { useEffect, useState } from "react";
import api from "../api/axios";
import AccountList from "../components/accounts/AccountList";
import AddAccountForm from "../components/accounts/AddAccountForm";
import PaymentModal from "../components/payments/PaymentModal";


function Accounts(){

    const [accounts, setAccounts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [editingAccount, setEditingAccount] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [paymentAccount, setPaymentAccount] = useState(null);

    async function fetchAccounts(){

        try{

            setIsLoading(true);
            setError("");

            const response = await api.get("/accounts/");

            setAccounts(response.data);

        }
        catch(error){

            setError(error.response?.data?.detail || "Unable to load accounts.");

        }
        finally {

            setIsLoading(false);

        }

    }


    useEffect(()=>{

        fetchAccounts();

    },[]);

    function openCreateForm() {
        setEditingAccount(null);
        setShowForm(true);
        setError("");
    }

    function openEditForm(account) {
        setEditingAccount(account);
        setShowForm(true);
        setError("");
    }

    async function handleSubmit(accountData) {

        try {

            setIsSaving(true);
            setError("");

            if (editingAccount) {
                const response = await api.put(`/accounts/${editingAccount.id}`, accountData);
                setAccounts((current) => current.map((account) => (
                    account.id === editingAccount.id ? response.data : account
                )));
            }
            else {
                const response = await api.post("/accounts/", accountData);
                setAccounts((current) => [...current, response.data]);
            }

            setEditingAccount(null);
            setShowForm(false);

        }
        catch(error){

            setError(error.response?.data?.detail || "Unable to save account.");

        }
        finally {

            setIsSaving(false);

        }

    }

    async function handleDelete(account) {

        if (!window.confirm(`Delete ${account.name}?`)) {
            return;
        }

        try {

            setError("");
            await api.delete(`/accounts/${account.id}`);
            setAccounts((current) => current.filter((item) => item.id !== account.id));

        }
        catch(error){

            setError(error.response?.data?.detail || "Unable to delete account.");

        }

    }

    function cancelForm() {
        setEditingAccount(null);
        setShowForm(false);
    }

    function handlePaymentSuccess() {
        setPaymentAccount(null);
        fetchAccounts();
    }



    return (

        <div>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Accounts
                    </h1>

                    <p className="mt-1 text-slate-500">
                        Manage your bank accounts, e-wallets, and cash.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openCreateForm}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    + Add Account
                </button>
            </div>


            {error && (
                <p className="mt-4 rounded-lg bg-red-50 p-3 text-red-700">
                    {error}
                </p>
            )}

            {showForm && (
                <AddAccountForm
                    key={editingAccount?.id ?? "new-account"}
                    account={editingAccount}
                    onSubmit={handleSubmit}
                    onCancel={cancelForm}
                    isSaving={isSaving}
                />
            )}

            {isLoading ? (
                <p className="mt-6 text-slate-500">Loading accounts...</p>
            ) : (
                <AccountList
                    accounts={accounts}
                    onEdit={openEditForm}
                    onDelete={handleDelete}
                    onPay={setPaymentAccount}
                />
            )}

            {paymentAccount && <PaymentModal targetType="account" targetId={paymentAccount.id} accounts={accounts} onSuccess={handlePaymentSuccess} onClose={() => setPaymentAccount(null)} />}


        </div>

    );

}


export default Accounts;