
import NavBar from "./NavBar"
import AddPalette from "./AddPalette"
import AllPalettes from "./AllPalettes"
import RandomPalette from "./RandomPalette"
import { useState } from "react"

export default function Home()
{
    const [navItem, setNavItem] = useState(0);
    const [loading, setLoading] = useState(false);

    const updateLoad = (value) => {
        setLoading(value)
    }

    const changeNavItem = (navID) => {
        setNavItem(navID);
    }

    const getPalettes = async() => {
        updateLoad(true)
        try {
            const response = await fetch("https://palettedock.onrender.com/palettes")
            const data = await response.json()
            return data;
            
        } catch (err) {
            alert(err.message)
            
        } finally {
        updateLoad(false)

        }
    }

    return (
        <div className="home">
            <div className="empty-top"></div>
            <NavBar changeNavItem={changeNavItem} currNavItem={navItem}/>

            { //add
            navItem == 0&& 
                <AddPalette updateLoad = {updateLoad}/>
            }

            { //view all
            navItem == 1&& 
                <AllPalettes getAllPalettes={getPalettes} updateLoad = {updateLoad}/>
            }

            { //randomize
            navItem == 2 && 
                <RandomPalette getAllPalettes={getPalettes} updateLoad = {updateLoad}/>
            }

            { //loading 
            loading &&
                <div className="load-screen horizontal-flex">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }

        </div>
    )
}