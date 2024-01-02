
export default function AddColour(props) {

    return (
        <div>
            <button onClick={props.togglePicker} className="colour-box black-stroke column-flex-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.5 17.5H35V22.5H22.5V35H17.5V22.5H5V17.5H17.5V5H22.5V17.5Z" fill="black">
                </path>
            </svg>
            create
            </button>
        </div>
    )
}