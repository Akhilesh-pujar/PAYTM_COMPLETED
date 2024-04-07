import React from "react";
import { useNavigate } from "react-router-dom";
import { transferTo } from "../states";
import { useSetRecoilState } from "recoil";

export default function UserCard({index, fullName, id, username}){

    const setTransferToUser = useSetRecoilState(transferTo);

    const navigate = useNavigate();

    function handleSend(){
        setTransferToUser({
            username: username, 
            fullName: fullName
        })
        navigate("/home/send_money")
    }

    return(
        <div className="flex justify-between w-11/12 m-auto mt-5">
            <span className="flex items-center">
                <p className="bg-gray-200 rounded-full w-8 p-2 text-center text-sm">{username[0]}</p>
                <p className="text-bold text-md ml-4">{username}</p>
            </span>
            <button onClick={handleSend} className="bg-black text-white p-2 rounded-md text-sm hover:bg-teal-500">Send Money</button>
        </div>
    )
}