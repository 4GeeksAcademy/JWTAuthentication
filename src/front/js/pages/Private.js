import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);

    const [isAuthenticated, setIsAuthenticated] = useState("pending")
    useEffect(() => {
        const authenticate = async() => {
            try{
                const results = await actions.goPrivate();
                setIsAuthenticated(results ? "yes" : "no")
            }
            catch(error){
                console.error("error creating authentication", error)
                setIsAuthenticated("no")
            }
        }
        authenticate()
    }, [actions])


    switch(isAuthenticated) {
        case "pending" :
            return(
                <div className="container text-center mt-4">
                    <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                </div>
            )
        case "yes" :
            return(
                <div className="container text-center mt-4">
                    <h1>Private Page</h1>
                    <p>This page is only accessible to users.</p>
                </div>
            )
            case "no" :
            return(
                <div className="container text-center mt-4">
                    <h1>Access Denied</h1>
                    <p>You are not authenticated. Please log in again.</p>
                </div>
            )
    }


}