import { useEffect, useState } from "react";

import api from "../api/axios";



function Settings(){


    const [settings,setSettings] = useState({

        currency:"",
        theme:"",
        notifications:false

    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");




    async function fetchSettings(){

        try{

            const response = await api.get(
                "/settings/"
            );


            setSettings(response.data);

        }
        catch(error){

            setError(error.response?.data?.detail || "Unable to load settings.");

        }

    }





    async function saveSettings(){

        try{

            await api.put(
                "/settings/",
                settings
            );


            setMessage("Settings saved");


        }
        catch(error){

            setError(error.response?.data?.detail || "Unable to save settings.");

        }

    }




    function handleChange(e){


        const {name,value,type,checked} = e.target;


        setSettings({

            ...settings,

            [name]:
            type === "checkbox"
            ? checked
            : value

        });

    }





    useEffect(()=>{

        fetchSettings();

    },[]);





    return (

        <div>


            <h1 className="
                text-3xl
                font-bold
                mb-6
            ">
                Settings
            </h1>

            {message && <p className="mb-4 rounded-lg bg-emerald-50 p-3 text-emerald-700">{message}</p>}
            {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}



            <div className="
                bg-white
                p-6
                rounded-lg
                shadow
                max-w-xl
            ">



                <label className="block mb-3">

                    Currency

                    <select

                        name="currency"

                        value={settings.currency}

                        onChange={handleChange}

                        className="
                            border
                            p-2
                            w-full
                            rounded
                        "
                    >

                        <option>
                            PHP
                        </option>

                        <option>
                            USD
                        </option>

                    </select>


                </label>




                <label className="block mb-3">

                    Theme


                    <select

                        name="theme"

                        value={settings.theme}

                        onChange={handleChange}

                        className="
                            border
                            p-2
                            w-full
                            rounded
                        "
                    >

                        <option>
                            light
                        </option>


                        <option>
                            dark
                        </option>


                    </select>


                </label>





                <label className="
                    flex
                    items-center
                    gap-3
                    mb-5
                ">


                    <input

                        type="checkbox"

                        name="notifications"

                        checked={settings.notifications}

                        onChange={handleChange}

                    />


                    Enable Notifications


                </label>





                <button

                    onClick={saveSettings}

                    className="
                        bg-slate-800
                        text-white
                        px-5
                        py-2
                        rounded
                    "

                >

                    Save Settings

                </button>



            </div>


        </div>

    );

}


export default Settings;