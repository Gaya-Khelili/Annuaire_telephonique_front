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
                    <Button variant="outline-info" onClick={() =>  
                        props.handleStateHeaderChange("detailsContact",props.contact.idContact)}>Details</Button>
                    <Button variant="outline-info" onClick={() => {deleteContact(props.contact.idContact) 
                             props.handleStateHeaderChange("manageContactsUpdated","")
                        }}>Delete</Button>
                </td>
            </tr>
        
    )
}

function deleteContact(idContact){
    fetch("http://localhost:8080/api/contact/"+idContact, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'DELETE',
            })
            .then(response => {
               
            })
            .catch(err => {
                console.log(err);
            });
}

export default TableContent