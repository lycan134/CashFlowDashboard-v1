function RecentTransactions({ transactions }) {
	return (
		<section className="rounded-xl bg-white p-6 shadow-sm">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-lg font-semibold text-slate-800">Recent activity</h2>
					<p className="mt-1 text-sm text-slate-500">Your latest money movements.</p>
				</div>
			</div>
			<div className="mt-5 space-y-4">
				{transactions.length === 0 ? <p className="text-sm text-slate-400">No transactions yet.</p> : transactions.slice(0, 5).map((transaction) => (
					<div key={transaction.id} className="flex items-center justify-between gap-3">
						<div className="min-w-0">
							<p className="truncate font-medium text-slate-800">{transaction.title}</p>
							<p className="text-xs text-slate-500">{transaction.category} · {transaction.account}</p>
							<p className="text-xs text-slate-400">{transaction.date ? new Date(`${transaction.date}T00:00:00`).toLocaleDateString() : "Date unavailable"}</p>
						</div>
						<p className={transaction.type === "income" ? "font-semibold text-emerald-600" : "font-semibold text-red-600"}>
							{transaction.type === "income" ? "+" : "-"}₱{Number(transaction.amount).toLocaleString()}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}

export default RecentTransactions;
