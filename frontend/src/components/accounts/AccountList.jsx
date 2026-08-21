import AccountCard from "./AccountCard";


function AccountList({ accounts, onEdit, onDelete, onPay }){

    if (accounts.length === 0) {
        return (
            <p className="mt-6 rounded-xl bg-white p-6 text-center text-slate-500 shadow">
                No accounts yet. Add your first account to get started.
            </p>
        );
    }

    return (

        <div className="mt-6 space-y-4">

            {
                accounts.map((account)=>(

                    <AccountCard
                        key={account.id}
                        account={account}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onPay={onPay}
                    />

                ))
            }

        </div>

    );

}


export default AccountList;