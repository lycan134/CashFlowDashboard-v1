import { NavLink } from "react-router-dom";

import {
    LayoutDashboard,
    Wallet,
    Receipt,
    CreditCard,
    BarChart3,
    Settings
} from "lucide-react";


const menuItems = [

    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
        end: true
    },

    {
        name: "Accounts",
        path: "/accounts",
        icon: Wallet
    },

    {
        name: "Transactions",
        path: "/transactions",
        icon: Receipt
    },

    {
        name: "Debts",
        path: "/debts",
        icon: CreditCard
    },

    {
        name: "Reports",
        path: "/reports",
        icon: BarChart3
    },

    {
        name: "Settings",
        path: "/settings",
        icon: Settings
    }

];


function Sidebar() {

    return (

        <aside className="
            w-72
            min-h-screen
            bg-slate-800
            text-white
        ">


            {/* Logo Section */}

            <div className="
                p-6
                border-b
                border-slate-700
            ">

                <h1 className="
                    text-2xl
                    font-bold
                ">
                    CashFlow
                </h1>


                <p className="
                    text-sm
                    text-slate-400
                    mt-1
                ">
                    Personal Finance
                </p>

            </div>



            {/* Navigation */}

            <nav className="p-4">

                <ul className="space-y-2">


                    {
                        menuItems.map((item)=>{

                            const Icon = item.icon;


                            return (

                                <li key={item.name}>


                                    <NavLink
                                        to={item.path}
                                        end={item.end}
                                        className={({isActive}) => 
                                            `
                                            flex
                                            items-center
                                            gap-3
                                            p-3
                                            rounded-lg
                                            transition

                                            ${
                                                isActive
                                                ?
                                                "bg-slate-700 text-white"
                                                :
                                                "text-slate-300 hover:bg-slate-700"
                                            }
                                            `
                                        }
                                    >


                                        <Icon size={20}/>


                                        <span>
                                            {item.name}
                                        </span>


                                    </NavLink>


                                </li>

                            );


                        })
                    }


                </ul>


            </nav>


        </aside>

    );

}


export default Sidebar;