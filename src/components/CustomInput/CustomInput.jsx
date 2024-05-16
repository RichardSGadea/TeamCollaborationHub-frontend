import "./CustomInput.css"

export const CustomInput = ({typeProp,value, nameProp, placeholderProp, handlerProp,isDisabled}) => {

    return(

        <input
            className="customInput-design"
            type={typeProp}
            name={nameProp}
            placeholder={placeholderProp}
            onChange={(e)=>handlerProp(e)}
            value={value}
            disabled={isDisabled}
        >
        </input>
    )

}