import {useState, useEffect} from "react"
import { nanoid } from "nanoid"

import PaletteItem from "./PaletteItem"

export default function AllPalette(props) {
    const [palettes, setPalettes] = useState([])
    const [filterState, setFilterState] = useState(0);
    const [filteredPalettes, setFilteredPalettes] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const data = await props.getAllPalettes()
            console.log(data)
            setPalettes([...data])
            setFilteredPalettes([...data].reverse())
        }
        fetchData()
    }, [])

    const updateFilter = (e) => {
        const filteredArray = [...palettes].reverse();
        if (e.target.value !=0)
            filteredArray.sort((a,b) => b.votes - a.votes)

        setFilteredPalettes(filteredArray)
        setFilterState(e.target.value)
    }


    const palettesToRender = filteredPalettes.map((item) => {
        return(
            <PaletteItem id={item.id} name={item.name} votes={item.votes} palette={item.hexValues} key={nanoid()}/>
        )
    })

    return (
        <div className="all-palettes">
            <div className="spread-horizontal-flex">
                <h2>colour palettes.</h2>
                <select name="filter" id="filter" onChange={updateFilter}>
                    <option value={0}>newest</option>
                    <option value={1}>most popular</option>
                </select>
            </div>
            <div className="palettes-view">
                {console.log(palettesToRender)}
                {palettesToRender}
                
            </div>
            
        </div>
    )
}