import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

import ColourBox from "./ColourBox"
import LikeButton from "./LikeButton"

export default function RandomPalette(props) {
    const [palettes, setPalettes] = useState([])
    const [randomIndex, setRandomIndex] = useState(0)

    useEffect(() => {
        const fetchData = async() => {
            const data = await props.getAllPalettes()
            setPalettes(data)
        }
    
        fetchData()
    }, [])

    useEffect(() => {
        randomize()
    }, [palettes.length])

    const randomize = () => {
        const randIndex = Math.floor(Math.random() * (palettes.length))
        setRandomIndex(randIndex)
    }


    let palette = []
    if(palettes.length > 0)
    {
        palette = palettes[randomIndex].hexValues.map(value => (
            <ColourBox colourCode={value} key={nanoid()}/>
        ))
    } 


    return (
        <div className="">
            {palettes.length > 0 &&
             <div>
                <button onClick={randomize}>randomize</button>
            
                <h2>{palettes[randomIndex].name}</h2>
                
                {palette}

                <LikeButton numVotes={palettes[randomIndex].votes} id={palettes[randomIndex].id}/>
             </div>
            }

        </div>

    )
}