import "./buttonGradiente.css";

function ButtonGradiente (props){

    return (
        <input className={`buttonGradiente ${props.classe ? props.ButtonGradiente: ""}`} type={props.tipo ? props.tipo: "button"} 
        value={props.valor} onClick={props.onClick} style={{...props.estilo}}/>
    )
};

export default ButtonGradiente;