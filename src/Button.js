import './Button.css'


const Button = ({ onClick, disabled }) => (
    <button className=" btn warning" onClick={onClick} disabled={disabled} > Start</button >
)

export default Button;
