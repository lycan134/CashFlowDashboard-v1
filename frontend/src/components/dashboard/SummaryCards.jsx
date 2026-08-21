import { ArrowDownRight, ArrowUpRight, CreditCard, Wallet, Scale, PiggyBank } from "lucide-react";


function SummaryCards({ summary }) {

    const cards = [
        { label: "Cash Available", value: summary?.total_balance, icon: Wallet, color: "text-blue-600", background: "bg-blue-50" },
        { label: "Total Income", value: summary?.total_income, icon: ArrowUpRight, color: "text-emerald-600", background: "bg-emerald-50" },
        { label: "Total Expenses", value: summary?.total_expense, icon: ArrowDownRight, color: "text-red-600", background: "bg-red-50" },
        { label: "Outstanding Debt", value: summary?.total_debt, icon: CreditCard, color: "text-amber-600", background: "bg-amber-50" },
        { label: "Net Worth", value: summary?.net_worth, icon: Scale, color: "text-indigo-600", background: "bg-indigo-50" },
        { label: "Monthly Remaining", value: summary?.monthly_remaining, icon: PiggyBank, color: "text-teal-600", background: "bg-teal-50" }
    ];

    return (

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map(({ label, value, icon: Icon, color, background }) => (
                <div key={label} className="rounded-xl bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-500">{label}</p>
                        <span className={`rounded-lg p-2 ${background} ${color}`}><Icon size={18} /></span>
                    </div>
                    <p className={`mt-4 text-2xl font-bold ${color}`}>
                        {value === undefined ? "--" : `₱${Number(value).toLocaleString()}`}
                    </p>
                </div>
            ))}
        </div>

    );

}

export default SummaryCards;