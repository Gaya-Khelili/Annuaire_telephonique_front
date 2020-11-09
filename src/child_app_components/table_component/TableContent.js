import React from "react"
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function TableContent(props){
    
    return (
           
            <tr>
                <td>{props.contact.idContact}</td>
                <td>{props.contact.fname}</td>
                <td>{props.contact.lname}</td>
                <td>{props.contact.email}</td>
                <td>
                    <Button variant="contained" 
                            color="primary"
                            startIcon={<AccountCircleIcon />}
                        onClick={() =>  
                            props.handleStateHeaderChange("detailsContact",props.contact.idContact)}>Details</Button>

                    <Button variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                        if (window.confirm('Are you sure you want to delete this contact?'))
                        deleteContact(props.contact.idContact,props)   
                        }}>Delete</Button>
                </td>
            </tr>
    )
}

function deleteContact(idContact,props){
    fetch("http://localhost:8080/api/contact/"+idContact, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'DELETE',
            })
            .then(response => {
                props.handleRefresh()
            })
            .catch(err => {
                console.log(err);
            });
}

export default TableContent