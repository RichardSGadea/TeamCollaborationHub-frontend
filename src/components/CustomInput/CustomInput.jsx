import "./CustomInput.css"

export const CustomInput = ({typeProp, nameProp, placeholderProp, handlerProp}) => {

    return(

        <input
            className="customInput-design"
            type={typeProp}
            name={nameProp}
            placeholder={placeholderProp}
            onChange={(e)=>handlerProp(e)}
        >
        </input>
    )

}