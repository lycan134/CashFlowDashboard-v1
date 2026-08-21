import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/layout/Header";
import SummaryCards from "../components/dashboard/SummaryCards";
import AccountsOverview from "../components/dashboard/AccountsOverview";
import CashFlowChart from "../components/dashboard/CashFlowChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import ExpenseBreakdown from "../components/dashboard/ExpenseBreakdown";
import UpcomingPayments from "../components/dashboard/UpcomingPayments";


function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                const response = await api.get("/reports/dashboard");
                setDashboard(response.data);
            } catch (requestError) {
                setError(requestError.response?.data?.detail || "Unable to load dashboard data.");
            }
        }

        loadDashboard();
    }, []);

    return (

        <div>

            <Header />

            <div className="mt-6">
                {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
                <SummaryCards summary={dashboard?.summary} />
            </div>


            <div className="mt-6">
                <AccountsOverview accounts={dashboard?.accounts || []} />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                <CashFlowChart transactions={dashboard?.recent_transactions || []} />
                <RecentTransactions transactions={dashboard?.recent_transactions || []} />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <ExpenseBreakdown categories={dashboard?.categories || []} />
                <UpcomingPayments payments={dashboard?.upcoming_payments || []} />
            </div>

        </div>

    );

}


export default Dashboard;