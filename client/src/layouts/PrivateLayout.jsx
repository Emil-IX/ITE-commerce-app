import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function PrivateLayout() {


    return (
        <div className="privateLayout">

            <Navbar />

            <main className="mainConten">
                <Outlet />
            </main>

        </div>
    )
}

