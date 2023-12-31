import ColourBox from "./ColourBox"
import LikeButton from "./LikeButton";
import { nanoid } from "nanoid";

export default function PaletteItem (props) {

    const palette = props.palette.map(value => (
        <ColourBox colourCode={value} key={nanoid()}/>
    ))

    return (
        <div className="all-palettes">
            <div className="spread-horizontal-flex">
                <h3>{props.name}</h3>
                <LikeButton />
            </div>
            {palette}
        </div>
    )
}