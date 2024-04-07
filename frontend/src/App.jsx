import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashbord from "./pages/Dashbord";
import SendMoneyModel from "./pages/SendMoney";
import Redirector from "./pages/Redirector";
import Home_page from "./pages/Home_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            <Redirector />
          }/>
               <Route path="/home" 
          element={
          <Home_page />
          }>
        </Route>
        <Route path="/home/signup" 
          element={
          <Signup />
          }>
        </Route>
        <Route path="/home/signin" 
          element={
            <Signin />
          }>
        </Route>
        <Route path="/home/dashbord" 
          element={
            <Dashbord />
          }>
        </Route>
        <Route path="/home/send_money"
          element={
            <SendMoneyModel />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
