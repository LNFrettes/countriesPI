import React from "react";
import { Link } from "react-router-dom";
import "../StyleSheets/Cards.css"

export default function ({c}){

    return(
        <div className="card">
            <Link to={`/countries/${c.name}`}>
                <img src={c.flagIm} className="flag" />
                <div className="country">{c.name}</div>
                <div className="continent">{c.continent}</div>
            </Link>
        </div>
    )
}