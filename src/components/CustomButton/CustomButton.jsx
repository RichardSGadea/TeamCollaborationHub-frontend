import "./CustomButton.css"

export const CustomButton = ({ title, classNameProp, functionEmit }) => {
    return (
        <div className={`btn ${classNameProp}`} onClick={functionEmit}>{title}</div>
    )

}