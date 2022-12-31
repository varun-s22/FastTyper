import { Link } from "react-router-dom"
import "./Error.css"

const Error = (props) => {
    return (
        <div className="Error">
            <h1 className="errorHeading">{props.heading}</h1>
            <div className="errorDesc">{props.description}</div>
            <div className="errorSuggestion">
                {props.suggestion}{" "}
                <Link to={props.navigateTo} className="redirect">
                    here
                </Link>
            </div>
        </div>
    )
}
export default Error
