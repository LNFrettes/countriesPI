import { order } from "../Actions";
import store from "../Store/index";
const redux = require('redux')

const intitialState = {
    countries: [],
    originalCountries: [],
    country: []
}

function rootReducer (state = intitialState, action) {

    function orderA( a, b ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
      }

      function orderP( a, b ) {
        if ( a.population < b.population ){
          return -1;
        }
        if ( a.population > b.population ){
          return 1;
        }
        return 0;
      }

    

    switch (action.type) {
        case 'GET_COUNTRIES':     
            return {
                ...state,
                countries: action.payload.sort(orderA),
                originalCountries: action.payload.sort(orderA)
            };

        case 'FILTER_BY_CONTINTENT':
            const countries = state.originalCountries
            const resultFilteredByContinent = countries.filter(c => c.continent === action.payload)
            return{
                 ...state,
                countries: resultFilteredByContinent};

        case 'FILTER_BY_ACTIVITY':
              if(action.payload){
                const countriesWithActivities = state.originalCountries.filter((c) => c.touristActivities.length > 0)
                
                
                const result = []
                //Sacar de los paises sus actividades
                countriesWithActivities.forEach(c1 =>{
                  console.log(c1)
                   c1.touristActivities.forEach(c2 => {
                     if(c2.nombre == action.payload){
                       result.push(c1)
                     }
                    
                    }) 
                 })


                // const result = countriesWithActivities.map(d => {
                //   const lalo = d.touristActivities.filter(e => {
                //     return  e.nombre == action.payload
                //   })
                //   return lalo
                // })
                   
                // console.log(result)

                 return{
                  ...state,
              countries: result};
              }
             else{
               return{
                       ...state,
                   countries: state.originalCountries};

             };
             


        case 'ORDER':
          console.log(action.payload)
            if(action.payload == 'AlfabeticalyA'){
              let result = state.countries.sort(orderA)
              console.log(result[1])
              return{
                ...state,
                countries: result
              };
            }
            else if(action.payload == 'AlfabeticalyD'){
              const result = state.countries.sort(orderA).reverse()
              return{
                ...state,
                countries: result
              };
            }
            else if(action.payload == 'PopulationA'){
              let result = state.countries.sort(orderP).reverse()
              return{
                ...state,
                countries: result
              };
            }
            else if(action.payload == 'PopulationD'){
              let result = state.countries.sort(orderP)
              return{
                ...state,
                countries: result
              };
            };        

        case 'SEARCH':
          return{
            ...state,
            countries: action.payload
          }
        
        case 'GET_COUNTRY':
          return{
            ...state,
            // countries: action.payload,
            country: action.payload
          }
        
        case 'CLEAN_COUNTRY':
          return {
            ...state,
            country: []
          }
          
        default:
            return {
                ...state,
            };
    }
}

export default rootReducer



