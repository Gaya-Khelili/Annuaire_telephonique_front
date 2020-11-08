import React from "react"
import FormComponent from "../child_app_components/form_component/FormComponent"

function CreateContact(props){

        return (
            <div>
                <FormComponent caller={props.modForm} idContact={props.idContact} 
                        handleStateHeaderChange={props.handleStateHeaderChange}/>
            </div>
            
        )
}

export default CreateContact