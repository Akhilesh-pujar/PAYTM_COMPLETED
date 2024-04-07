import React from "react";
import Navbar from "../components/Navbar";
import YourBalance from "../components/YouBalance";
import FindUsers from "../components/FindUsers";
import Loader from "../components/Loader";

export default function Dashbord() {

    // const [showModel, setShowModel] = useState(false);

    return(
        <div className="bg-[#CCD0CF] h-screen">
            <Navbar></Navbar>
            <YourBalance></YourBalance>
            <FindUsers></FindUsers>
        </div>
    )
}

