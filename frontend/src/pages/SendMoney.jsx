import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { transferTo } from "../states";
import { useNavigate } from "react-router-dom"
import Loader from "../components/Loader";

export default function SendMoneyModel(){

    const [showLoader, setShowLoader] = useState(false);
    const [amount, setAmount] = useState("");
    const transferToUser = useRecoilValue(transferTo);
    const navigate = useNavigate();

    const token = localStorage.getItem("myToken");

    async function handleTransaction(){
        setShowLoader(true);
        const res = await fetch(`http://localhost:3000/api/v1/account/transfer`, {
            method: "POST",
            body: JSON.stringify({
                to: transferToUser.username,
                amount: Number(amount)
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if(!res.ok){
            const data = await res.json();
            setShowLoader(false);
            alert(data.msg);
            return;
        }
        const data = await res.json();
        setShowLoader(false)
        alert(data.msg);
        navigate("/dashbord");
    }


    return(
        <div className="flex justify-center h-screen items-center bg-gray-200">
        <div className="p-8 flex flex-col border shadow-lg md:w-2/5 max-w-96 bg-white rounded-3xl">
            <h2 className="text-bold mb-3 text-2xl md:text-3xl md:mb-5 m-auto drop-shadow-xl p-1">Send Money</h2>
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="border-black w-7 h-7 mr-2 border-2 rounded-full p-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                <p className="text-lg md:text-xl text-bold">{transferToUser.fullName}</p>
            </div>
            <p className="text-xs font-medium mt-2 mb-2">Amount (in Rs)</p>
            <input required="required" value={amount} onChange={e => setAmount(e.target.value)} className="border border-inherit mb-3 p-2" type="number" placeholder="Enter Amount" />
            <button onClick={handleTransaction} className="bg-teal-500 rounded-md drop-shadow p-2 hover:bg-teal-600">Initiate Transfer</button>
        </div>
        {showLoader && <div className="absolute w-full h-full flex flex-col items-center justify-center bg-gray-200 opacity-75">
            <Loader></Loader>
            <p className="mt-2 font-medium">Processing transaction</p>
        </div>}
        </div>

    )
}