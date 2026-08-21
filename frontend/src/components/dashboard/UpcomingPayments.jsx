function UpcomingPayments({ payments }) {
    return (
        <section className="rounded-xl bg-white p-6 shadow-sm">
            <div>
                <h2 className="text-lg font-semibold text-slate-800">Upcoming payments</h2>
                <p className="mt-1 text-sm text-slate-500">Debt and BNPL obligations to plan for.</p>
            </div>
            <div className="mt-5 space-y-4">
                {payments.length === 0 ? <p className="text-sm text-slate-400">No upcoming payments.</p> : payments.slice(0, 6).map((payment) => (
                    <div key={`${payment.name}-${payment.due_date}`} className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-b-0">
                        <div>
                            <p className="font-medium text-slate-800">{payment.name}</p>
                            <p className="mt-1 text-xs text-slate-500">Due {payment.due_date}</p>
                        </div>
                        <p className="font-semibold text-amber-600">₱{Number(payment.amount).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default UpcomingPayments;
