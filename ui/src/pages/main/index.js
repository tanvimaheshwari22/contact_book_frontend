import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const MainPage = () => {
    let navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("accessToken") === null) {
            navigate("/login");
            return
        } else {
            navigate("/dash")
        }
    }, []);

    return <Outlet />;
};

export default MainPage;