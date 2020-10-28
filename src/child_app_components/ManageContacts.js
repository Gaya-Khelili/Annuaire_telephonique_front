import React from "react"
import Table from 'react-bootstrap/Table'
import TableContent from "./TableContent"


class ManageContacts extends React.Component{

    constructor(){
        super()
    }

    componentDidMount(){
        console.log("load ManageContacts")
    }

    render(){
        return (
            <div>
            <h1>Manage your contacts</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <TableContent />
                </tbody>
            </Table>
            </div> 
        )
    }    
}

export default ManageContacts