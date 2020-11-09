import React from "react"
import {Form,Button,Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

class Notice extends React.Component{

    constructor(){
        super()
    }

    componentDidMount(){
        console.log("load notice")
    }

   

    render(){
        return (
               <h1>Notice</h1>
        )
    }    
}

export default Notice