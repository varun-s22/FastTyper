import "./DialogBox.css"

const DialogBox = (props) => {
    return (
        <div className="DialogBox">
            <div className="overlay"></div>
            <div className="dialogBox">
                <span className="dialogBoxSpan">
                    <h2 className="dialogHeading">{props.heading}</h2>
                    <h3 onClick={props.hideDialogBox} className="closingBtn">
                        X
                    </h3>
                </span>

                <div className="innerContent">{props.content}</div>
            </div>
        </div>
    )
}
export default DialogBox
