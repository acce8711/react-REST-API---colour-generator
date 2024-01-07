
import OpenAI from "openai";
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


const openai = new OpenAI(
    {
        apiKey: import.meta.env.VITE_API_KEY,
        dangerouslyAllowBrowser: true
    }
)


export default function AddPalette(props) {
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

    
    const [generatingText, setGenerating] = useState(false)
    const [chatError, setChatError] = useState(false);
    const [apiError, setApiError] = useState(false);
        
    const handleSubmit = async () => {
        setApiError(false);

        //setChatQuestion("")
        //setQuestionToDisplay(message);
        setGenerating(true)
        //let contentToAdd = {question: message,content: ""}
        const filtered = colours.filter(value => value!= "empty");
        const content = filtered.length > 4? "generate a 2 word random colour palette name" : `generate a 2 word name to describe this palette: ${filtered}`;
        await openai.chat.completions.create(
            {
                model: "gpt-3.5-turbo",
                messages: [
                {
                    role: "user",
                    content: content
                }],
            }
            ).then((result) => {
           // contentToAdd.content = result.choices[0].message.content;
           // props.setChat(prevValue => ([...prevValue, contentToAdd]))
            let paletteNameTemp = result.choices[0].message.content;
            paletteNameTemp = paletteNameTemp.replace(/"/g, "")
            paletteNameTemp = paletteNameTemp.toLowerCase()

            setPaletteName(prev => ({...prev, name: paletteNameTemp}))
            setGenerating(false)
            }).catch(error => setApiError(true)) 
        

    }
    

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
        props.updateLoad(true);
        const inputCheckMessage = verifyInput(paletteName.name);
        if(inputCheckMessage.length > 0) 
        {
            setPaletteName(prev => ({...prev, valid: false, errorMessage: inputCheckMessage}))
            props.updateLoad(false);
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
            props.updateLoad(false);
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
        <PendingColour key={nanoid()} colourCode={value} small={false} togglePicker={()=> toggleColourPicker(true, index)} removeColour = {() => changeColour("empty", index)} />
        )
    })


    return (
        <div className="column-flex max-width gap-md m-50">
            <h2>share your colour palette with the community.</h2>
            <div className="spread-horizontal-flex black-stroke add-palette gap-md">   
                {palette}
            </div>
            <div className="gap-xs">
                <button onClick={handleSubmit} className="button-hover auto-generate">
                    auto generate
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 17 17" fill="none">
                        <path className={generatingText?"load-icon":""} fill-rule="evenodd" clip-rule="evenodd" d="M7.08317 4.95829H4.38659C5.35026 3.59737 6.80435 2.83329 8.49984 2.83329C11.6295 2.83329 14.1665 5.37035 14.1665 8.49996H15.5832C15.5832 4.58794 12.4119 1.41663 8.49984 1.41663C6.51351 1.41663 4.76345 2.25424 3.5415 3.73312V1.41663H2.12484V6.37496H7.08317V4.95829ZM9.9165 12.0416H12.6131C11.6494 13.4025 10.1953 14.1666 8.49984 14.1666C5.37022 14.1666 2.83317 11.6296 2.83317 8.49996H1.4165C1.4165 12.412 4.58782 15.5833 8.49984 15.5833C10.4862 15.5833 12.2362 14.7457 13.4582 13.2668V15.5833H14.8748V10.625H9.9165V12.0416Z" fill="#4690FF"/>
                    </svg>
                </button>
                <form onSubmit={uploadPalette} className="horizontal-flex gap-xs">
                    <input
                    type="text"
                    value={paletteName.name}
                    onChange={changePaletteName}
                    name="paletteName"
                    className={`share black-stroke`}
                    />
                    <button disabled={colours.filter(x => x == "empty").length > 3} onClick={uploadPalette} className={`share black-stroke` }>share</button>
                </form>
                {!paletteName.valid &&
                <span className="error-msg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 25 25" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4036 0 25 5.59644 25 12.5C25 19.4036 19.4036 25 12.5 25ZM12.5 22.7273C18.1484 22.7273 22.7273 18.1484 22.7273 12.5C22.7273 6.85163 18.1484 2.27273 12.5 2.27273C6.85163 2.27273 2.27273 6.85163 2.27273 12.5C2.27273 18.1484 6.85163 22.7273 12.5 22.7273ZM13.6405 14.7708H14.7761V17.0436H10.2306V14.7708H11.367V12.4981H10.2306V10.2254H13.6405V14.7708ZM12.5004 9.08903C11.8726 9.08903 11.3636 8.58026 11.3636 7.95267C11.3636 7.32507 11.8726 6.8163 12.5004 6.8163C13.1282 6.8163 13.6371 7.32507 13.6371 7.95267C13.6371 8.58026 13.1282 9.08903 12.5004 9.08903Z" fill="#FF6262"/>
                    </svg>
                    <p>{paletteName.errorMessage}</p>
                </span>}
            </div>

            {pickerValues.toggle && 
            <ColourPicker colourChangeHandle = {changeColour} colourCode = {colours[pickerValues.id]} id = {pickerValues.id} hidePicker={() => toggleColourPicker(false)}/>
            }

            {shareModal.show &&
            <ShareModal hideModal={hideShareModal} colourCodes={shareModal.palette} paletteName={shareModal.paletteName}/>}

        </div>
    )
}