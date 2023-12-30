import { ChromePicker } from 'react-color'

export default function ColourPicker(props)
{
    return(
        <div className='colour-picker picker-bg'>
            <div className='colour-picker picker-bg' onClick={props.hidePicker}></div>
            <ChromePicker 
            clas
                disableAlpha = {true}
                color={props.colourCode}
                onChange={(e) => props.colourChangeHandle(e.hex, props.id)}   
            />
        </div>
    )
}