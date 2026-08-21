function AccountsOverview({ accounts }) {

    return (

        <div className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-slate-800">
                Accounts Overview
            </h2>

            <p className="mt-2 text-slate-500">Your bank accounts, e-wallets, cash, and credit cards.</p>

            <div className="mt-5 grid gap-3 md:grid-cols-4">
                {accounts.length === 0 ? <p className="text-sm text-slate-400">No accounts added yet.</p> : accounts.map((account) => (
                    <div key={account.id} className="rounded-lg border border-slate-100 p-4">
                        <p className="font-semibold text-slate-800">{account.name}</p>
                        <p className="mt-1 text-xs text-slate-500">{account.type === "credit_card" ? "Credit Card" : account.type}</p>
                        <p className={`mt-3 text-lg font-bold ${account.type === "credit_card" ? "text-red-600" : "text-slate-900"}`}>₱{Number(account.balance).toLocaleString()}</p>
                        {account.type === "credit_card" && <p className="mt-1 text-xs text-slate-500">Owed balance</p>}
                    </div>
                ))}
            </div>

        </div>

    );

}


export default AccountsOverview;