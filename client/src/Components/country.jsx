import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanCountry, getCountry } from "../Actions";
import '../StyleSheets/country.css'




export default function Country (){

    const dispatch = useDispatch()

    const {id} = useParams()
    
    
    
    useEffect(() => {
        dispatch(getCountry(id));
        return () => {
            dispatch(cleanCountry())
        }
    },[dispatch]); //3

    console.log(useSelector(((state) => state)))
    let c = useSelector(((state) => state.country), () => {return false})[0]
    console.log(c)
   
    
    if(!c){
        return(<div></div>)
    }
    else{
        let touristA = c.touristActivities
        
        return(
            <div className="countryContainer">
                <div className='flagContainer'>
                    <img src={c.flagIm} className='flaggDetail'/>
                </div>
                <div className='detailContainer'>
                    <div>
                        <h6>Nick</h6>
                        <h5>{c.id}</h5>
                    </div>
    
                    <div>
                        <h6>Country</h6>
                        <h5>{c.name}</h5>
                    </div>
    
                    <div>
                        {c.subRegion ? (<h5>{c.subRegion}</h5>) : null}
                        {c.subRegion ? (<h6>Subregion</h6>) : null}
                    </div>
    
    
                    <div>
                        <h6>Population</h6>
                        <h5>{c.population}</h5>    
                    </div>
    
    
                </div>
                <div className='activityContainer'>
                    <h6 className='activityMain'>Activities</h6>
                        {
                            touristA.map((t) => {
                                console.log(t.nombre)
                                return (
                                    <h6 className='activity'>{t.nombre}</h6>
                                    )
                                })
                            }
                </div>
            </div>
        )
    }
  
}