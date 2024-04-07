import React, { useEffect } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

export default function Redirector() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("myToken");
        if(token){
            navigate("/home/signin");
        }else{
            navigate("/home");    
        }

    });

    return (
        <Loader />
    )
}