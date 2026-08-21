import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import { AuthProvider, ProtectedRoute } from "./auth/AuthContext";

import DashboardLayout from "./components/layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Debts from "./pages/Debts";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";



function App(){

    return (

        <BrowserRouter>

            <AuthProvider>

            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route index element={<Navigate to="dashboard" replace />} />


                    <Route
                        path="dashboard"
                        element={<Dashboard />}
                    />


                    <Route
                        path="accounts"
                        element={<Accounts />}
                    />


                    <Route
                        path="transactions"
                        element={<Transactions />}
                    />

                    <Route path="debts" element={<Debts />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="settings" element={<Settings />} />


                </Route>


            </Routes>

            </AuthProvider>


        </BrowserRouter>

    );

}


export default App;