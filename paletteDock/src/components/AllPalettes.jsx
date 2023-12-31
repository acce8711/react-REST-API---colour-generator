import {useState, useEffect} from "react"
import { nanoid } from "nanoid"

import PaletteItem from "./PaletteItem"

export default function AddPalette() {
    const [palettes, setPalettes] = useState([ ])

    useEffect(() => {
        getPalettes()
    }, [])

    const getPalettes = async() => {
        try {
            const response = await fetch("https://palettedock.onrender.com/palettes")
            const data = await response.json()
            setPalettes(data)
        } catch (err) {
            alert(err.message)
        }
    }

    const palettesToRender = palettes.map(value => {
        <PaletteItem colourCode={value.id} name={value.name} votes={value.votes} id={value.hexValues} key={nanoid()}/>
    })

    return (
        <div className="all-palettes">
            <div className="spread-horizontal-flex">
                <h2>colour palettes.</h2>
                <button>filter</button>
            </div>
            <div className="palettes-view">

            </div>
            
        </div>
    )
}