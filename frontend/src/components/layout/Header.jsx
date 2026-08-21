import { useAuth } from "../../auth/AuthContext";


function Header() {

    const { user, logout } = useAuth();

    return (

        <header className="bg-white rounded-lg shadow p-4 flex items-center justify-between">

            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Dashboard
                </h1>

                <p className="text-sm text-slate-500">
                    Overview of your finances
                </p>
            </div>


            <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
                    VT
                </div>

                <div>
                    <p className="font-semibold">
                        Hello, {user?.username}
                    </p>

                    <p className="text-sm text-slate-500">
                        Finance Manager
                    </p>
                </div>

                <button
                    type="button"
                    onClick={logout}
                    className="text-sm text-slate-600 hover:text-slate-900"
                >
                    Logout
                </button>

            </div>


        </header>

    );

}


export default Header;