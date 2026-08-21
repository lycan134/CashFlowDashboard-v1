import { useState } from "react";


const emptyAccount = {
    name: "",
    type: "bank",
    balance: "",
    credit_limit: "",
    payment_due_day: ""
};


function AddAccountForm({ account, onSubmit, onCancel, isSaving }) {

    const [formData, setFormData] = useState(account ? {
            name: account.name,
            type: account.type,
            balance: account.balance,
            credit_limit: account.credit_limit ?? "",
            payment_due_day: account.payment_due_day ?? ""
        } : emptyAccount);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit({
            ...formData,
            balance: Number(formData.balance),
            credit_limit: formData.type === "credit_card" ? Number(formData.credit_limit) : null,
            payment_due_day: formData.type === "credit_card" ? Number(formData.payment_due_day) : null
        });
    }

    return (

        <form onSubmit={handleSubmit} className="
            bg-white
            p-6
            rounded-xl
            shadow
            mt-6
        ">

            <h2 className="text-xl font-bold mb-4">
                {account ? "Edit Account" : "Add New Account"}
            </h2>


            <div className="space-y-4">


                <input
                    name="name"
                    type="text"
                    placeholder="Account name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                    "
                />


                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                    "
                >

                    <option value="bank">Bank</option>
                    <option value="e_wallet">E-wallet</option>
                    <option value="cash">Cash</option>
                    <option value="credit_card">Credit Card</option>

                </select>

                {formData.type === "credit_card" && (
                    <>
                        <input
                            name="credit_limit"
                            type="number"
                            placeholder="Credit limit"
                            value={formData.credit_limit}
                            onChange={handleChange}
                            required
                            min="0.01"
                            step="0.01"
                            className="w-full rounded-lg border p-3"
                        />
                        <input
                            name="payment_due_day"
                            type="number"
                            min="1"
                            max="31"
                            placeholder="Payment due day (1-31)"
                            value={formData.payment_due_day}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border p-3"
                        />
                    </>
                )}


                <input
                    name="balance"
                    type="number"
                    placeholder="Initial balance"
                    value={formData.balance}
                    onChange={handleChange}
                    required
                    step="0.01"
                    className="
                        w-full
                        border
                        p-3
                        rounded-lg
                    "
                />


                <button
                    type="submit"
                    disabled={isSaving}
                    className="
                        bg-blue-600
                        text-white
                        px-4
                        py-2
                        rounded-lg
                    "
                >
                    {isSaving ? "Saving..." : account ? "Update Account" : "Save Account"}
                </button>

                {account && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="ml-3 rounded-lg border border-slate-300 px-4 py-2 text-slate-700"
                    >
                        Cancel
                    </button>
                )}


            </div>


        </form>

    );

}


export default AddAccountForm;