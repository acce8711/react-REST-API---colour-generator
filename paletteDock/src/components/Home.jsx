
import NavBar from "./NavBar"
import AddPalette from "./AddPalette"
import AllPalettes from "./AllPalettes"
import RandomPalette from "./RandomPalette"
import { useState } from "react"

export default function Home()
{
    const [navItem, setNavItem] = useState(0);

    const changeNavItem = (navID) => {
        setNavItem(navID);
    }

    const getPalettes = async() => {
        try {
            const response = await fetch("https://palettedock.onrender.com/palettes")
            const data = await response.json()
            return data;
        } catch (err) {
            alert(err.message)
            
        }
        
    }

    return (
        <div className="home">
            <NavBar changeNavItem={changeNavItem}/>

            { //add
            navItem == 0 && 
                <AddPalette />
            }

            { //view all
            navItem == 1 && 
                <AllPalettes getAllPalettes={getPalettes}/>
            }

            { //randomize
            navItem == 2 && 
                <RandomPalette getAllPalettes={getPalettes}/>
            }

        </div>
    )
}