const express = require('express')
const { Router, application } = require('express');
const axios = require('axios')
const {Op} = require('sequelize')
const { Country, TouristActivity } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

//parsing JSON requests to put it in req.body
router.use(express.json())





// async (promise) function to store countries in Data Base
const pruebo = async () => {
    try{
        const info = await axios.get("https://restcountries.com/v3.1/all")
            const paises = info.data
            const countriesForBulk = paises.map(c => {
                let capital = c.capital
                if(capital instanceof Array){
                    capital = capital.toString()
                }
                return {
                    name: c.name.common,
                    flagIm: c.flags.png,
                    continent: c.continents[0],
                    capital: capital,
                    subRegion: c.subregion,
                    population: c.population,
                    id: c.cca3
                }
            })
            await Country.bulkCreate(countriesForBulk)
    } catch(e) {return e}
    
}


pruebo()




router.get('/countries', async (req, res) => { 
    let nombre = req.query.name

    //path if it has query
    if(nombre){
        let pais = await Country.findAll({
            attributes: ['id', 'name', 'flagIm', 'continent', 'capital', 'subRegion', 'population'],
            where: {name:  {[Op.iLike]: `${nombre}%`}},  include: TouristActivity
        })
        pais.length ? res.status(202).send(pais) : res.status(404).send('No existes')
    }
    //if it doesnt has query
    else{

        try{
            const paises = await Country.findAll({
                attributes: ['id','name', 'flagIm', 'continent', 'capital', 'subRegion', 'population'],
                include: {
                    model: TouristActivity
                }
            }) 
            res.send(paises)
        }catch(e){ res.status(404).send(e)}
    }
})

router.get('/countries/:id', async (req, res) => {
    const {id} = req.params
    try{
        const pais = await Country.findAll({
                attributes: ['id','name', 'flagIm', 'continent', 'capital', 'subRegion', 'population'],
                where: {name: id}, include: TouristActivity
        })

        res.send(pais)
    } catch(e){ res.status(404).send(e)}
})

router.post('/activity', async (req, res) => {
    const {nombre, dificultad, duracion, temporada, paises} = req.body
    try{
        const act = await TouristActivity.create({
            nombre: nombre,
            dificultad: dificultad,
            duracion: duracion,
            temporada: temporada
        })
    
        paises.forEach(async (c) => {
            const country = await Country.findByPk(c)
            country.addTouristActivity(act.id) //set me steps over last asociations 
           
        })

    } catch(e){ res.status(404).send(e)}

})



module.exports = router;
