import {useState, useEffect} from "react"
import { nanoid } from "nanoid"

import PaletteItem from "./PaletteItem"

export default function AllPalette(props) {
    const [palettes, setPalettes] = useState([ ])

    useEffect(() => {
        const fetchData = async() => {
            const data = await props.getAllPalettes()
            console.log(data)
            setPalettes([...data])
        }
        

        fetchData()
    }, [])


    const palettesToRender = palettes.map((item) => {
        return(
            <PaletteItem id={item.id} name={item.name} votes={item.votes} palette={item.hexValues} key={nanoid()}/>
        )
    })

    return (
        <div className="all-palettes">
            <div className="spread-horizontal-flex">
                <h2>colour palettes.</h2>
                <button>filter</button>
            </div>
            <div className="palettes-view">
                {console.log(palettesToRender)}
                {palettesToRender}
                
            </div>
            
        </div>
    )
}