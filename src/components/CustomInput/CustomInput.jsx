import "./CustomInput.css"

export const CustomInput = ({typeProp,value, nameProp, placeholderProp, handlerProp,isDisabled, checked, classProp}) => {

    return(

        <input
            className={`customInput-design ${classProp}`}
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