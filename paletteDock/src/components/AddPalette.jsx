import { colors } from "@mui/material";
import AddColour from "./AddColour"
import PendingColour from "./PendingColour";
import ColourPicker from "./ColourPicker";
import ShareModal from "./ShareModal";
import {useEffect, useState} from "react"
import { nanoid } from "nanoid";
import { RegExpMatcher,
	TextCensor,
	englishDataset,
	englishRecommendedTransformers } from "obscenity";


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
            toggle: false,
            id: -1,
        }
    )
    const [paletteName, setPaletteName] = useState({
        name: "",
        valid: true,
        errorMessage: ""
    });

    //changing colour based on colour picker
    const changeColour = (value, id) => {
        setColours(prevValue => {
            return(prevValue.map((item, index) => index == id ? value : item))
        })
    }

    const [shareModal, setShareModal] = useState({
        show: false,
        palette: [],
        paletteName: ""
    })

    //closing colour picker
    const toggleColourPicker = (openPicker, newID = -1) => {
        setPickerValues({toggle: openPicker, id: newID});
    }

    //changing palette name input
    const changePaletteName = (e) => {
        const {value} = e.target;
        setPaletteName(prev => ({...prev, name: value.toLowerCase()}));
    }

    //hiding share model
    const hideShareModal = () => {
        setShareModal(({show: false, palette: [], paletteName: ""}))
    }

    //uploading palette to json-server
    const uploadPalette = async(e) => {
        e.preventDefault();
        
        const inputCheckMessage = verifyInput(paletteName.name);
        if(inputCheckMessage.length > 0) 
        {
            setPaletteName(prev => ({...prev, valid: false, errorMessage: inputCheckMessage}))
            return;
        }
        else
            setPaletteName(prev => ({...prev, valid: true, errorMessage: ""}))

        //uploading the palette to json-server
        const coloursToUpload = colours.filter(value => value!= "empty")
            try 
            {
                const response = await fetch("https://palettedock.onrender.com/palettes", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({
                        id: nanoid(),
                        name: paletteName.name.toLowerCase(),
                        hexValues: coloursToUpload,
                        votes: 0
                    })
                })

                setShareModal({show: true, palette: [...coloursToUpload], paletteName: paletteName.name})
                
                //clearing values
                setPaletteName({name:"", valid: true, errorMessage: ""});
                setColours(prev => prev.map(()=>"empty"))
            } catch (err) {
                alert(err.message)
            }
    }

    //checking for obscene language and input length
    const verifyInput = (inputToCheck) => {
        let message = "";

        if (inputToCheck.length < 2)
            message = "palette name must be at least 2 characters long"

        const matcher = new RegExpMatcher({
            ...englishDataset.build(),
            ...englishRecommendedTransformers,
        })

        if(matcher.hasMatch(inputToCheck))
        {
            message = (message.length > 0) ? message +" and not contain obscene language" : "palette name must not contain obscene language";
        }
        return message;
    }

    //mapping the colours to jsx elements
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
                    value={paletteName.name}
                    onChange={changePaletteName}
                    name="paletteName"
                    />
                    <button disabled={colours.filter(x => x == "empty").length > 3} onClick={uploadPalette}>share</button>
                </form>
                {!paletteName.valid &&
                <p>{paletteName.errorMessage}</p>}
            </div>

            {pickerValues.toggle && 
            <ColourPicker colourChangeHandle = {changeColour} colourCode = {colours[pickerValues.id]} id = {pickerValues.id} hidePicker={() => toggleColourPicker(false)}/>
            }

            {
                console.log(shareModal)
            }
            {shareModal.show &&
            <ShareModal hideModal={hideShareModal} colourCodes={shareModal.palette} paletteName={shareModal.paletteName}/>}

        </div>
    )
}