import React from "react"

class CreateContact extends React.Component{

    constructor(){
        super()
    }

    componentDidMount(){
        console.log("load create contact")
    }

    render(){
        return (
            <div>
                <h1>Dans Create Contact</h1>
            </div>
            
        )
    }    
}

export default CreateContact