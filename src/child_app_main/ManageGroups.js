import React from "react"
import Table from 'react-bootstrap/Table'
import TableContentGroup from "../child_app_components/table_component_group/TableComponentGroup"


class ManageGroups extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            allContactGroup:[]
        }
        this.handleRefresh = this.handleRefresh.bind(this)
    }
    
    componentDidMount(){
        if (this.props.modSelection === "allContactGroups"){
            fetch("http://localhost:8080/api/groupContact/")
            .then(response => response.json())
            .then(data => {
                this.setState({allContactGroup:data})
            })
            .catch(err => {throw new Error(err)})
        }
    }

    buildContactGroupComponent(){
        
        const contactsGroupComponent = this.state.allContactGroup.map(item => 
            <TableContentGroup key={item.groupId} contactGroup={item} 
                handleStateHeaderChange={this.props.handleStateHeaderChange}
                handleRefresh={this.handleRefresh}/>)
        return contactsGroupComponent
    }

    handleRefresh(){
        this.componentDidMount()
    }

    render(){
        return (
            <div>
            <h1>Manage your Group Contact</h1>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Group Name</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.buildContactGroupComponent()}
                </tbody>
            </Table>
            </div> 
        )
    }    
}

export default ManageGroups