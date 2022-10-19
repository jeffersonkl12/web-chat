import "./input.css";

function Input(props){
    return(
        <input className="input-default" type={props.tipo ? props.tipo: "text"} placeholder={props.placeHolder}
        onChange={props.onChange} id={props.id} value={props.valor}/>
    )
}

export default Input;