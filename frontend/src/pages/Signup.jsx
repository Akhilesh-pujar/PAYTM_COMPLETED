import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState, firstNameState, lastNameState, passwordState } from "../states";
import Loader from "../components/Loader";

export default function Signup() {
    
    const navigate = useNavigate();

    const [username, setUsername] = useRecoilState(usernameState);
    const [firstName, setFirstName] = useRecoilState(firstNameState);
    const [lastName, setLastName] = useRecoilState(lastNameState);
    const [password, setPassword] = useRecoilState(passwordState);

    const [showLoader, setShowLoader] = useState(false);

    async function handleSignup() {
        setShowLoader(true)
        try{
            const res = await fetch("https://paytm-completed.vercel.app/api/v1/user/signup", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            if(!res.ok){
                alert("HTTP error! status: " + res.status);
                setShowLoader(false);
                return;
            }
    
            const data = await res.json();
    
            alert(data.msg);

            localStorage.setItem("myToken", data.token);

            setShowLoader(false)
            navigate("/dashbord")
        }catch(err){
            console.log("Request Crashed!");
        }
    }

    function navigateToSignin(){
        navigate("/home/signin");
    }
    
    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <div className="rounded-2xl p-6 flex flex-col justify-center bg-white drop-shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl text-bold mb-2">Sign Up</h1>
                    <p className="m-auto w-5/6 mb-2 text-gray-700">Enter your information to create an account</p>
                </div>
                <label htmlFor="username">Username</label>
                <input className="border-2 p-1 mb-2 mt-1" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
                
                <label htmlFor="first-name">First Name</label>
                <input className="border-2 p-1 mb-2 mt-1" type="text" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                
                <label htmlFor="last-name">Last Name</label>
                <input className="border-2 p-1 mb-2 mt-1" type="text" value={lastName} onChange={e => setLastName(e.target.value)}/>
                
                <label htmlFor="password">Password</label>
                <input className="border-2 p-1 mb-2 mt-1" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                
                <button onClick={handleSignup} className="border-black border-2 rounded-xl bg-black text-white w-1/2 m-auto hover:bg-teal-400">Sign Up</button>
                <div className="flex justify-center">
                    <p className="mr-2">Already have an account?</p>
                    <a onClick={navigateToSignin} className="underline hover:text-teal-400 cursor-pointer">Sign-in</a>
                </div>
            </div>
            {showLoader && <div className="absolute w-full h-full flex items-center justify-center bg-gray-200 opacity-80">
            <Loader></Loader>
            </div>}
        </div>
    )
}