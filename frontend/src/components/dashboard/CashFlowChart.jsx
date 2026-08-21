function CashFlowChart({ transactions }) {
	const income = transactions.filter((transaction) => transaction.type === "income").reduce((total, transaction) => total + Number(transaction.amount), 0);
	const expenses = transactions.filter((transaction) => transaction.type === "expense").reduce((total, transaction) => total + Number(transaction.amount), 0);
	const maximum = Math.max(income, expenses, 1);

	return (
		<section className="rounded-xl bg-white p-6 shadow-sm">
			<div className="flex items-start justify-between">
				<div>
					<h2 className="text-lg font-semibold text-slate-800">Cash flow</h2>
					<p className="mt-1 text-sm text-slate-500">Income compared with expenses.</p>
				</div>
				<span className="text-xs text-slate-400">All time</span>
			</div>
			<div className="mt-8 flex h-40 items-end justify-center gap-16 border-b border-slate-100">
				{[{ label: "Income", value: income, color: "bg-emerald-500" }, { label: "Expenses", value: expenses, color: "bg-red-400" }].map((item) => (
					<div key={item.label} className="flex h-full flex-col items-center justify-end gap-2">
						<span className="text-sm font-semibold text-slate-700">₱{item.value.toLocaleString()}</span>
						<div className={`w-16 rounded-t-lg ${item.color}`} style={{ height: `${Math.max((item.value / maximum) * 100, 5)}%` }} />
						<span className="pb-3 text-sm text-slate-500">{item.label}</span>
					</div>
				))}
			</div>
		</section>
	);
}

export default CashFlowChart;
