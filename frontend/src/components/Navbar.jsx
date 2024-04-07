import React, { useEffect, useState } from "react";
import { firstNameState, lastNameState } from "../states";
import {useRecoilState} from "recoil";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
export default function Navbar(){
    
    const [firstName, setFirstName] = useRecoilState(firstNameState);
    const [lastName, setLastName] = useRecoilState(lastNameState);
    const [showLoader, setShowLoader] = useState(true);

    const token = localStorage.getItem("myToken")
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/user/userInfo", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setShowLoader(false);
        })
    }, [])
    const navigate = useNavigate();
    
    return(
        <div className="flex items-center border-2px border-black h-20 justify-between shadow-md">
            <span>
                <h1 className="text-bold text-teal-500 inline text-2xl ml-4 mt-8 drop-shadow">Paytm</h1>
                <h1 className="inline text-bold text-2xl mt-8 drop-shadow">App</h1>
            </span>
            {showLoader ? 
            <div className="h-full mr-5 flex items-center">
                <Loader />
            </div> :
            <span className="flex justify-center">
                <p  className="mr-8 cursor-pointer">Hello, {`${firstName}`}</p>
                <button onClick={()=>{
                 localStorage.clear();
                 
                    navigate("/home")
                 
                }} className=" box-border text-base rounded-md shadow-md bg-red-500 text-white px-2">Log out</button>
                
            </span>
            }
        </div>
    )
}