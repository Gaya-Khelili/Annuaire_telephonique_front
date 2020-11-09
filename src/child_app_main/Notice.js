import React from "react"

class Notice extends React.Component{

    constructor(){
        super()
    }

    componentDidMount(){
        console.log("load notice")
    }

    render(){
        return (
            <div>
                <h1>Dans Notice</h1>
            </div>
            
        )
    }    
}

export default Notice