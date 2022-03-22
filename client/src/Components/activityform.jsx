import React, { useEffect } from "react";
import axios from 'axios';
import Card from "./card";
import {useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getCountries, search, order } from "../Actions";
import { Paginado } from "./paginado";
import '../StyleSheets/form.css'




export default function(){

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCountries())
    },[])

    const countries = useSelector(state => state.countries)
    // console.log("🚀 ~ file: activityform.jsx ~ line 12 ~ function ~ countries", countries)
    
    // 1. state que mire si son cambiadas
    const [input, setInput] = useState({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        countriees:  [],
    })

    const [disabled, setDisabled] = useState(true)
    const [checkeds, setCheckeds] = useState([])

    const [error, setError] = useState({
        name: "Write a name",
        dificulty: "Choose a dificulty level",
        duration: "The activity should not be longer than 120 minutes",
        season: "Choose a season",
        countries: "Choose a country"
    })


    
    
    function handleChange(e){
        e.preventDefault()
        const {name, value} = e.target
        let errors = error
        let cheked = checkeds
        
        
        switch (name) {
            case 'name':
                errors.name = value.length < 1 ? 'Debe insertar un nombre' : '';
                setInput({...input, [name]: value})
                break;
            case 'duration':
                errors.duration = value > 120 ? 'La duración de la actividad debe ser menor a 2 horas' : '';
                setInput({...input, [name]: value})
                break;
            case 'dificulty':
                errors.dificulty = !value ? 'Debe elegir un nivel de dificultad' : '';
                setInput({...input, [name]: value})
                break;
            case 'season':
                errors.season = !value ? 'La duración de la actividad debe ser menor a 2 horas' : '';
                setInput({...input, [name]: value})
                break;
            case 'countries':
                if(!checkeds.includes(value)){
                    cheked.push(value)
                    setInput({...input, countriees: [...input.countriees, value]})
                    // arrayCountries.push(value)
                    errors.countries = cheked.length < 1 ? 'Debe elegir un pais' : '';
                }
                else if (checkeds.includes(value)){
                    let list = cheked.filter((c) => c !== value)
                    cheked = list
                    let arrayCountries = input.countriees.filter((c) => c !== value)
                    setInput({...input, countriees: arrayCountries})
                    // arrayCountries = arrayCountries.filter( c => c !== value)
                    errors.countries = cheked.length < 1 ? 'Debe elegir un pais' : '';

                };
                break;
    
            default:
                break;
        }
        
        console.log(input.countriees)
        setCheckeds(cheked)
        setError({...error, errors})
        validForm(errors)
        
    }
    




    function validForm(errors){
        let valid = true
        Object.values(errors).forEach(val => val.length > 0 && (valid = false))
        // console.log('dis', valid)
        if(valid){
          setDisabled((disabled) => disabled = false)
          console.log(22)
        }
        else setDisabled((disabled) => disabled = true)
    }


    function handleSearch(e){
        e.preventDefault()
        dispatch(search(e.target.value))
    }

    const [currentPage, setCurrentPage] = useState(0)
    const [firstCountry, setFirstCountry] = useState(0)
    const [lastCountry, setLastCountry] = useState(9)
    let amountPages = Math.ceil(countries.length/10)
    const splited = countries.slice(firstCountry, lastCountry)
    
    function goToPage(e){
        e.preventDefault()
        if(e.target.value >= 0 && e.target.value < amountPages){
            setCurrentPage(e.target.value)
            setFirstCountry(e.target.value * 10)
            setLastCountry(((10 * e.target.value) + 10))
        }
    }

    
    async function handleSubmit(e){
        e.preventDefault();

        console.log(input)

        setInput({
            name: "",
            dificulty: "",
            duration: "",
            season: "",
            countriees:  []})
        
        
        setCheckeds([])
        setDisabled(true)
        setError({
            name: "Write a name",
            dificulty: "Choose a dificulty level",
            duration: "The activity should not be longer than 120 minutes",
            season: "Choose a season",
            countries: "Choose a country"
        })


        await axios.post('/activity',(
            {
            nombre: input.name,
            dificultad: input.dificulty,
            duracion: input.duration,
            temporada: input.season,
            paises:  input.countriees
        }))
    }


    return( //1
    <>
        <form onSubmit={(e)=>handleSubmit(e)} className="formContainer">
            <h3 className="formTitle">Create an Activity</h3>
            
            <div className="formInputContainer">
                <input onChange={handleChange} className="textInput" type='text' name="name" placeholder="Name" value={input.name} />
                {!error.name ? null : <div className="errorsInput">{error.name}</div>}
            </div>

            <div className="formInputContainer">
                <input  className="textInput" placeholder="Duration" onChange={handleChange} type='number' max="200" min='1'   name="duration" value={input.duration} />
                {!error.duration ? null : <div className="errorsInput">{error.duration}</div>}
            </div>

            <div className="formInputContainer">
                <select className="completeInput" defaultValue={""} name="dificulty" placeholder="Dificulty" onChange={handleChange}>
                    <option value="" disabled  hidden>Dificulty</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                {!error.dificulty ? null : <div className="errorsInput" >{error.dificulty}</div>}
            </div>

            <div className="formInputContainer">
                <select onChange={handleChange} defaultValue={""} className="completeInput" name="season" placeholder="Season" >
                    <option value="" disabled  hidden>Season</option>
                    <option value="Verano">summer</option>
                    <option value="Primavera">spring</option>
                    <option value="Otoño">autumn</option>
                    <option value="Invierno">winter</option>
                </select>
                {!error.season ? null : <div className="errorsInput">{error.season}</div>}
            </div>


            <div  className="formInputContainer">
                <div className="formCountrylevel">
                    <label className="Countrylabel">Country</label>
                    <input className="searchBarForm"placeholder='search' onChange={(e) => handleSearch(e)}></input>
                </div>
              {!error.countries ? null : <div className="errorsInput">{error.countries}</div>}
              {/* <Paginado amountPages={amountPages} goToPage={goToPage} current={currentPage}/>                 */}
            </div>
            <div className="countryFormContainer">
                {splited.map((c) => {
                    return(
                        <div key={c.id + 1} value={c.id} className="countryOne">
                            {
                                <input className="checkCountry" type="checkbox" name="countries"  onInput={(e)=>handleChange(e)} value={c.id} checked={checkeds.includes(c.id)}/>}
                            {c.name}
                        </div>
                           
                           )
                        })}   
            </div>
            <input disabled={disabled} className="submitForm" type="submit" value="submit"/>

        </form>   
    
    </>
)
}