import React from "react"
import FormControl from "./form_component/FormComponent"

class CreateContact extends React.Component{

    constructor(){
        super()
        this.state = {
            caller:"createContact"
        }
    }

    componentDidMount(){
        console.log("load create contact")
    }

    render(){
        return (
            <div>
                <FormControl caller={this.state.caller}/>
            </div>
            
        )
    }    
}

export default CreateContact