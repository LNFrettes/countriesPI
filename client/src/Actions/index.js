import axios from 'axios'

export const getCountries = () => {
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/countries');
        return  dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })

    }
}

export const order = (type) => {

    return{
        type:"ORDER",
        payload: type
    }
}

export const filterByContinent = (continent) => {
    
    return {
        type: 'FILTER_BY_CONTINTENT',
        payload: continent
    }
}

export const filterByActivity = (activity) => {

    return {
        type: 'FILTER_BY_ACTIVITY',
        payload: activity
    }
}

// export const search = (input) => {
//     return async function (dispatch){
//         var list = await axios.get('http://localhost:3001/countries?name=' + input);
//         return dispatch({
//             type: 'SEARCH',
//             payload: list.data
//         })
//     }
// }


export const search = (input) => {
    return async function (dispatch){
        try{
            var res = await axios.get('http://localhost:3001/countries?name=' + input)
                return dispatch({
                       type: 'SEARCH',
                       payload: res.data
                    })    
        }catch(e){console.log(e)}
        
    }
}


export const getCountry = (id) => {
    return async function (dispatch){
        var onlyDetail = await axios.get('http://localhost:3001/countries/' + id);
        console.log(onlyDetail.data)
        return dispatch({
            type: 'GET_COUNTRY',
            payload: onlyDetail.data
        })
    }
}

export const cleanCountry = () => {
    return {
        type: 'CLEAN_COUNTRY'
    }
}