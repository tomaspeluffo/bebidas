import React, { createContext, useEffect, useState} from 'react'
import Axios from 'axios';

// Creamos el context

export const ModalContext = createContext();

const ModalProvider = (props) =>{

    // State del Provider

    const [ idrecetas, guardarIdReceta] = useState(null);
    const [informacion, guardarReceta] = useState({})

    // Una vez que tenemos una receta, llamamos la API

    useEffect(() => {

        const obtenerReceta = async () =>{
            if(!idrecetas) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idrecetas}`

            const resultado = await Axios.get(url);

            guardarReceta(resultado.data.drinks[0])

        }
        obtenerReceta();
        
    }, [idrecetas])

    return(
        <ModalContext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>

    )
}

export default ModalProvider;

