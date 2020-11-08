import React from "react"

class CreateGroup extends React.Component{

    constructor(){
        super()
    }

    componentDidMount(){
        console.log("load create group")
    }

    render(){
        return (
            <div>
                <h1>Dans Create group</h1>
            </div>
            
        )
    }    
}

export default CreateGroup