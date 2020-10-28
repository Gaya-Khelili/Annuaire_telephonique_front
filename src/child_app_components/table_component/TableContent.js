import React from "react"
import {Button} from "react-bootstrap"

function TableContent(props){

    
    return (
           
            <tr>
                <td>{props.contact.idContact}</td>
                <td>{props.contact.fname}</td>
                <td>{props.contact.lname}</td>
                <td>{props.contact.email}</td>
                <td>
                    <Button variant="outline-info" onClick={() => {console.log(props.contact.idContact)}}>Details</Button>
                    <Button variant="outline-info">Update</Button>
                    <Button variant="outline-info">Delete</Button>
                </td>
            </tr>
        
    )
}

export default TableContent