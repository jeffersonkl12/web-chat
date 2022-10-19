import "./inputLine.css";

function InputLine(props){

    return(
        <input className={`input-line ${props.classe ? props.className: null}`} type={props.tipo ? props.tipo: "text"} required={true} placeholder={props.placeHolder} 
        value={props.valor} onChange={props.onChange} style={props.estilo}/>
    )

};

export default InputLine;