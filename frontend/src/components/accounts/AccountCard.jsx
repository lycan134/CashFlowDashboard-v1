import { Pencil, Trash2 } from "lucide-react";


function AccountCard({ account, onEdit, onDelete, onPay }) {

    const isCreditCard = account.type === "credit_card";
    const availableCredit = Number(account.credit_limit || 0) - Number(account.balance || 0);
    const accountTypeLabels = {
        bank: "Bank",
        e_wallet: "E-wallet",
        cash: "Cash",
        credit_card: "Credit Card"
    };

    return (

        <div className="
            bg-white
            rounded-xl
            shadow
            p-5
            flex
            justify-between
            items-center
        ">


            <div>

                <h2 className="text-lg font-semibold">
                    {account.name}
                </h2>


                <p className="text-sm text-slate-500">
                    {accountTypeLabels[account.type] || account.type}
                </p>

                {isCreditCard && (
                    <p className="mt-1 text-xs text-slate-500">
                        Available credit: ₱{Math.max(availableCredit, 0).toLocaleString()}
                    </p>
                )}

                {isCreditCard && account.due_date && (
                    <p className="mt-1 text-xs text-slate-500">Due {account.due_date}</p>
                )}

                {isCreditCard && account.payment_due_day && (
                    <p className="mt-1 text-xs text-slate-500">Every {account.payment_due_day}th</p>
                )}

            </div>


            <div className="flex items-center gap-4 text-right">

                <p className={`text-xl font-bold ${isCreditCard ? "text-red-600" : "text-green-600"}`}>
                    ₱{Number(account.balance).toLocaleString()}
                </p>

                <div className="flex gap-2">
                    {isCreditCard && Number(account.balance) > 0 && (
                        <button type="button" onClick={() => onPay(account)} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700">Pay</button>
                    )}
                    <button
                        type="button"
                        onClick={() => onEdit(account)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                        aria-label={`Edit ${account.name}`}
                        title="Edit account"
                    >
                        <Pencil size={17} />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(account)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        aria-label={`Delete ${account.name}`}
                        title="Delete account"
                    >
                        <Trash2 size={17} />
                    </button>
                </div>

            </div>


        </div>

    );

}


export default AccountCard;