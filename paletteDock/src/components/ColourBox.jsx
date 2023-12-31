
export default function ColourBox(props) {
    return(
        <div>
            <div className="colour-box" style={{backgroundColor: props.colourCode}}></div>
            <h4>{props.colourCode}</h4>
        </div>
    )
}