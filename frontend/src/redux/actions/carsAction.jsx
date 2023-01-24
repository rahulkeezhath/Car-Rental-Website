import axios from 'axios'

export const getAllCars=()=> async dispatch=>{
    dispatch({type: 'LOADING', payload:true})

    try{
        const cars = await axios.get('https://car-data.p.rapidapi.com/cars')
        dispatch({type: 'GET_ALL_CARS', payload:response.data})
        dispatch({type: 'LOADING', payload:false})
    }catch (error){
        console.log(error);
        dispatch({type: 'LOADING', payload:true})
    }
}