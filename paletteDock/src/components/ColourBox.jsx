
export default function ColourBox(props) {

    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.colourCode);
    }

    return(
        <div>
            <div className="colour-box" style={{backgroundColor: props.colourCode}} onClick={copyToClipboard}></div>
            <h4>{props.colourCode}</h4>
        </div>
    )
}