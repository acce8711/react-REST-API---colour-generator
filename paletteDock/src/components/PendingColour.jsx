import {useState} from "react"

export default function PendingColour(props) {

    const styles = {
        backgroundColor: props.colourCode,
    }

    return (
        <div className="pending-colour column-flex-2 gap-sm">
            <button onClick={props.removeColour} className="horizontal-flex delete height-sm">
            delete
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00016 0.666626H10.0002C10.7365 0.666626 11.3335 1.26358 11.3335 1.99996V2.66663H13.3335C14.0699 2.66663 14.6668 3.26358 14.6668 3.99996V5.33329C14.6668 6.06967 14.0699 6.66663 13.3335 6.66663H13.2801L12.6668 14C12.6668 14.7363 12.0699 15.3333 11.3335 15.3333H4.66683C3.93045 15.3333 3.3335 14.7363 3.3358 14.0553L2.72007 6.66663H2.66683C1.93045 6.66663 1.3335 6.06967 1.3335 5.33329V3.99996C1.3335 3.26358 1.93045 2.66663 2.66683 2.66663H4.66683V1.99996C4.66683 1.26358 5.26378 0.666626 6.00016 0.666626ZM11.9423 6.66663L11.3358 13.9446L11.3335 14H4.66683L4.05782 6.66663H11.9423ZM2.66683 5.33329V3.99996H13.3335V5.33329H2.66683ZM10.0002 1.99996V2.66663H6.00016V1.99996H10.0002Z" fill="#FF6262"/>
            </svg>
            
            </button>
            <button className="colour-box grey-stroke" style={styles} onClick={props.togglePicker}>
            </button> 
            <h3 className="height-sm">{props.colourCode}</h3>      
        </div>
    )
}