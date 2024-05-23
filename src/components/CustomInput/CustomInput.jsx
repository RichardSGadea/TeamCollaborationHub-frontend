import "./CustomInput.css"

export const CustomInput = ({typeProp,value, nameProp, placeholderProp, handlerProp,isDisabled, checked}) => {

    return(

        <input
            className="customInput-design"
            type={typeProp}
            name={nameProp}
            placeholder={placeholderProp}
            onChange={(e)=>handlerProp(e)}
            value={value}
            disabled={isDisabled}
            checked={checked}
        >
        </input>
    )

}