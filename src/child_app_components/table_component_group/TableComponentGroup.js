import React from "react"
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function TableContentGroup(props){
    
    return (
           
            <tr>
                <td>{props.contactGroup.groupId}</td>
                <td>{props.contactGroup.groupName}</td>
                <td>


                    {/* <Button variant="contained" 
                            color="primary"
                            startIcon={<AccountCircleIcon />}
                        onClick={() =>  
                            props.handleStateHeaderChange("updateContactGroup",props.contactGroup.groupId)}>Update</Button> */}
                            <Button variant="contained" 
                            color="primary"
                            startIcon={<AccountCircleIcon />}
                        onClick={() =>  
                            props.handleStateHeaderChange("addContact",props.contactGroup.groupId)}>Add Contacts</Button>
                             <Button variant="contained" 
                            color="secondary"
                            startIcon={<DeleteIcon />}
                        onClick={() =>  
                            props.handleStateHeaderChange("deleteContact",props.contactGroup.groupId)}>Delete Contacts</Button>
                        <Button variant="contained" 
                            color="primary"
                            startIcon={<AccountCircleIcon />}
                        onClick={() =>  
                            props.handleStateHeaderChange("detailsContactGroup",props.contactGroup.groupId)}>Details</Button>
                    {/* <Button variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                        if (window.confirm('Are you sure you want to delete this contact group?'))
                           deleteContactGroup(props.contactGroup.groupId,props)   
                       // props.handleStateHeaderChange("deleteContactGroup",props.contactGroup.groupId)
                        }}>Delete</Button> */}
                </td>
            </tr>
    )
}

function deleteContactGroup(groupId,props){
    
    fetch("http://localhost:8080/api/groupContact/contactGroup/"+groupId, {
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

export default TableContentGroup
