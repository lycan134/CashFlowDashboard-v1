function ExpenseBreakdown({ categories }) {
    const total = categories.reduce((sum, item) => sum + Number(item.amount), 0);

    return (
        <section className="rounded-xl bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-800">Expense breakdown</h2>
                    <p className="mt-1 text-sm text-slate-500">Where your money is going.</p>
                </div>
                <span className="text-sm font-semibold text-slate-700">₱{total.toLocaleString()}</span>
            </div>
            <div className="mt-5 space-y-4">
                {categories.length === 0 ? <p className="text-sm text-slate-400">No expenses recorded yet.</p> : categories.slice(0, 8).map((item) => {
                    const percentage = total > 0 ? (Number(item.amount) / total) * 100 : 0;
                    return (
                        <div key={item.category}>
                            <div className="mb-1 flex justify-between text-sm">
                                <span className="font-medium text-slate-700">{item.category}</span>
                                <span className="text-slate-500">₱{Number(item.amount).toLocaleString()}</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100">
                                <div className="h-2 rounded-full bg-red-400" style={{ width: `${percentage}%` }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default ExpenseBreakdown;
