import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, filterByContinent, order, search, filterByActivity } from '../Actions/index'
import { Link } from 'react-router-dom'
import Card from './card'
import { Paginado } from './paginado'
import '../StyleSheets/mainpage.css'


export default function Mainpage () {
    
    const dispatch = useDispatch()

    
    const [act, setAct] = useState(1)
    
    useEffect(() => {
        dispatch(getCountries());
        dispatch(order('AlfabeticalyA'))
    },[]); //3
    
    
    let countries = useSelector((state) => state.countries)
    let countriesForFilter = useSelector((state) => state.originalCountries)
    console.log("🚀 ~ file: mainpage.jsx ~ line 23 ~ Mainpage ~ countries", countries)
    const [currentPage, setCurrentPage] = useState(0)
    const [firstCountry, setFirstCountry] = useState(0)
    const [lastCountry, setLastCountry] = useState(9)
    let amountPages = Math.ceil(countries.length/10)
    const splited = countries.slice(firstCountry, lastCountry)
    console.log("🚀 ~ file: mainpage.jsx ~ line 30 ~ Mainpage ~ splited", splited)
    
    function goToPage(e){
        e.preventDefault()
        if(e.target.value >= 0 && e.target.value < amountPages){
            console.log('e.target.value'+e.target.value)
            setCurrentPage(e.target.value)
            setFirstCountry(e.target.value * 10)
            setLastCountry(((10 * e.target.value) + 10))
            console.log('currentPage'+ currentPage)
        }
    }
    
    function handleContinentFilter(e){
        e.preventDefault()
        if(e.target.value == 'All'){
            return dispatch(getCountries())
        }
        dispatch(filterByContinent(e.target.value))
        setCurrentPage(0)
        setFirstCountry(0)
        setLastCountry(9)
    }

    function handleOrder(e){
        e.preventDefault()
        dispatch(order(e.target.value))
        setAct(e.target.value)
    }

    function handleSearch(e){
        e.preventDefault()
        setCurrentPage(0)
        setFirstCountry(0)
        setLastCountry(9)
        dispatch(search(e.target.value))

    }
    
    const nombres = []
    

    //Buscar paises con actividades
    const countriesWithActivities = countriesForFilter.filter((c) => c.touristActivities.length > 0)
    //Sacar de los paises sus actividades
    const allActivities = countriesWithActivities.map(c => c.touristActivities)
    //Filtrar las actividades repetidas
    allActivities.forEach(c => {
        c.forEach((n)=> {
            if(!nombres.includes(n.nombre)){
                nombres.push(n.nombre)
            }
        })
    })
    
    function handleActivity(e) {
        e.preventDefault()
        dispatch(filterByActivity(e.target.value))
        console.log(1)
    }



    return(
        <>
        <header>
            <h2 className='mainTitle'>Countries</h2>
            <div className='headerButtons'>
                <Link  to='/activities'>
                    <button className='addActivityMain'>
                        Add tourist activity
                    </button>
                </Link>
              <input  placeholder='Search' className='searchBarMain' onChange={(e) => handleSearch(e)}></input>                
            </div>
        </header>
        <div className='mainbodycontainer'>
            <div className='whiteMainPage'>
                <div className='filtersContainer'>
                    <select className="filters" defaultValue={''} name="Contintent" onChange={e => handleContinentFilter(e)}>
                        <option value="" disabled  hidden>Continent</option>
                        <option value='All'>All</option>
                        <option value='North America'>North America</option>
                        <option value='South America'>South America</option>
                        <option value='Asia'>Asia</option>
                        <option value='Europe'>Europe</option>
                        <option value='Africa'>Africa</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='Antarctica'>Antarctica</option>
                    </select>
                    <select className="filters" defaultValue={''} name='Activities'  onChange={e => handleActivity(e)}>
                        <option value="" disabled  hidden>Activities</option>
                        <option value="" >All</option>
                        {nombres.map( a => {
                                return(
                                    <option value={a} key={a}> {a}</option>
                                )

                            }
                        )}
                    </select>
                    <select className="filters" defaultValue={''} name="order" onChange={e => handleOrder(e)}>
                        <option value="" disabled  hidden>Order</option>
                        <option value="AlfabeticalyA">Alfabeticaly Ascending</option>
                        <option value="AlfabeticalyD">Alfabeticaly Descending</option>
                        <option value="PopulationA">Population Ascending</option>
                        <option value="PopulationD">Population Descending</option>
                    </select>
                </div>
                <div className="cardContainer">
                    {splited.map((c) => <Card  key={c.id} c={c}/>)}
                </div>
                <div>
                    <Paginado className="paginadoMain" amountPages={amountPages} goToPage={goToPage} current={currentPage}/>
                </div>
            </div>
        </div>

        </>
    )
}