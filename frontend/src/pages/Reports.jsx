import { useEffect, useState } from "react";

import api from "../api/axios";



function Reports(){


    const [summary,setSummary] = useState(null);
    const [error, setError] = useState("");



    async function fetchReport(){

        try{

            const response = await api.get(
                "/reports/summary"
            );


            setSummary(response.data);

        }
        catch(error){

            setError(error.response?.data?.detail || "Unable to load report.");

        }

    }



    useEffect(()=>{

        fetchReport();

    },[]);




    return (

        <div>


            <h1 className="
                text-3xl
                font-bold
                mb-6
            ">
                Reports
            </h1>

            <p className="mb-6 text-slate-500">A concise view of your current financial position.</p>
            {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}

            {!summary && !error && <p className="text-slate-500">Loading report...</p>}



            {
                summary && (

                    <div className="
                        grid
                        grid-cols-4
                        gap-6
                    ">


                        <div className="bg-white p-5 rounded-lg shadow">

                            <h2>
                                Total Balance
                            </h2>

                            <p className="text-2xl font-bold">

                                ₱{Number(summary.total_balance).toLocaleString()}

                            </p>

                        </div>



                        <div className="bg-white p-5 rounded-lg shadow">

                            <h2>
                                Income
                            </h2>

                            <p className="text-2xl font-bold">

                                ₱{Number(summary.total_income).toLocaleString()}

                            </p>

                        </div>



                        <div className="bg-white p-5 rounded-lg shadow">

                            <h2>
                                Expenses
                            </h2>

                            <p className="text-2xl font-bold">

                                ₱{Number(summary.total_expense).toLocaleString()}

                            </p>

                        </div>




                        <div className="bg-white p-5 rounded-lg shadow">

                            <h2>
                                Debt
                            </h2>

                            <p className="text-2xl font-bold">

                                ₱{Number(summary.total_debt).toLocaleString()}

                            </p>

                        </div>


                    </div>

                )
            }


        </div>

    );

}


export default Reports;