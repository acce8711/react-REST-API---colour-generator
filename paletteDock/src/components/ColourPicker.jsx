import { ChromePicker } from 'react-color'

export default function ColourPicker(props)
{
    return(
        <div className='modal-bg-size modal-bg'>
            <div className='modal-bg-size' onClick={props.hidePicker}></div>
            <ChromePicker 
            clas
                disableAlpha = {true}
                color={props.colourCode}
                onChange={(e) => props.colourChangeHandle(e.hex, props.id)}   
            />
        </div>
    )
}