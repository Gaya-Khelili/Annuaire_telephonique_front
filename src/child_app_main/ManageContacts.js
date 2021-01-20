import React from "react"
import Table from 'react-bootstrap/Table'
import TableContent from "../child_app_components/table_component/TableContent"


class ManageContacts extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            allContact:[]
        }
        this.handleRefresh = this.handleRefresh.bind(this)
        this.filterDuplicate = this.filterDuplicate.bind(this)
        
    }
    
    componentDidMount(){
       
        if (this.props.modSelection === "allContacts"){
            fetch("http://localhost:8080/api/contact/")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({allContact:data})
            })
            .catch(err => {throw new Error(err)})
        }
        else {
            fetch("http://localhost:8080/api/contact/search/" + this.props.modSelection)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({allContact:data})
            })
            .catch(err => {throw new Error(err)})

            fetch("http://localhost:8080/api/phone/search/" + this.props.modSelection)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState(
                    {allContact: this.state.allContact.concat(data)})
            })
            .catch(err => {throw new Error(err)})

            fetch("http://localhost:8080/api/address/search/" + this.props.modSelection)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState(
                    {allContact: this.state.allContact.concat(data)})
            })
            .catch(err => {throw new Error(err)})
        }

        this.filterDuplicate()
    }

    filterDuplicate(){
        const listAllContact = [... new Set(this.state.allContact.map(tag => tag.idContact))]
        this.setState({allContact: listAllContact})
    }


    buildContactComponent(){
        
        const contactsComponent = this.state.allContact.map(item => 
            <TableContent key={item.idContact} contact={item} 
                handleStateHeaderChange={this.props.handleStateHeaderChange}
                handleRefresh={this.handleRefresh}/>)
        return contactsComponent
    }

    handleRefresh(){
        this.componentDidMount()
    }

    render(){
        return (
            <div>
            <h1>Manage your contacts</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.buildContactComponent()}
                </tbody>
            </Table>
            </div> 
        )
    }    
}

export default ManageContacts