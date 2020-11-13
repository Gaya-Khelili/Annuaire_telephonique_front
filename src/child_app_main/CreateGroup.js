import React from "react"
import FormComponentGroup from "../child_app_components/form_component_group/FormComponentGroup"

function CreateGroup(props){

    return (
        <div>
            <FormComponentGroup caller={props.modForm} groupId={props.groupId} 
                    handleStateHeaderChange={props.handleStateHeaderChange}/>
        </div>
        
    )
}

export default CreateGroup