import { colors } from "@mui/material";
import AddColour from "./AddColour"
import PendingColour from "./PendingColour";
import ColourPicker from "./ColourPicker";
import {useState} from "react"
import { nanoid } from "nanoid";



export default function AddPalette() {
    const [colours, setColours] = useState([
        "empty",
        "empty",
        "empty",
        "empty",
        "empty"
    ])
    const [pickerValues, setPickerValues] = useState(
        {
            toggle: true,
            id: -1,
        }
    )
    const [paletteName, setPaletteName] = useState("");

    //changing colour based on colour picker
    const changeColour = (value, id) => {
        setColours(prevValue => {
            return(prevValue.map((item, index) => index == id ? value : item))
        })
    }

    //closing colour picker
    const toggleColourPicker = (openPicker, newID = -1) => {
        setPickerValues({toggle: openPicker, id: newID});
    }

    const changePaletteName = (e) => {
        const {value} = e.target;
        setPaletteName(value);
    }

    //uploading palette to json-server
    const uploadPalette = async(e) => {
        e.preventDefault();
        
        try 
        {
            
        }
        //clearing value
        setPaletteName("");
    }

    const palette = colours.map((value, index) => {
        return (
        colours[index] == "empty" ?
        <AddColour key={nanoid()} colourCode={value} togglePicker={()=> toggleColourPicker(true, index)} />
        :
        <PendingColour key={nanoid()} colourCode={value} togglePicker={()=> toggleColourPicker(true, index)} removeColour = {() => changeColour("empty", index)} />
        )
    })


    return (
        <div className="add-palette">
            <h2>share your colour palette with the community.</h2>
            <div className="palette-selection">   
                {palette}
            </div>
            <div>
                <button>random</button>
                <form onSubmit={uploadPalette}>
                    <input
                    type="text"
                    value={paletteName}
                    onChange={changePaletteName}
                    name="paletteName"
                    />
                    <button disabled={colours.filter(x => x == "empty").length > 3}>share</button>
                </form>
            </div>

            {pickerValues.toggle && 
            <ColourPicker colourChangeHandle = {changeColour} colourCode = {colours[pickerValues.id]} id = {pickerValues.id} hidePicker={() => toggleColourPicker(false)}/>
            }

        </div>
    )
}