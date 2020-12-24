import React from "react"
import {Form,Col,InputGroup} from "react-bootstrap"

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CreateIcon from '@material-ui/icons/Create';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

class FormComponentGroup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modForm:"",  
            groupId:"",
            groupName:"",
            idContact:"",
            contacts:[{idContact:"",lname:"",fname:"",email:""}],
            lname:"",
            fname:"",
            email:""
        }
        
        
        
        this.getContactInfo = this.getContactInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.createContactGroup = this.createContactGroup.bind(this)
        this.updateContactGroup = this.updateContactGroup.bind(this)
        this.deleteContactGroup = this.deleteContactGroup.bind(this)
    }


    componentDidMount(){
        
        if (this.props.caller === "detailsContactGroup") {
            this.setState({modForm:"Update contact group"})
            console.log("group id "+this.props.groupId)
            this.getGroupInfo(this.props.groupId)
            this.getContactInfo(this.props.groupId)
        }
        else if(this.props.caller === "deleteContactGroup"){
            this.deleteContactGroup(this.props.groupId)
    }
        else {

            fetch("http://localhost:8080/api/contact")
            .then(response => response.json())
            .then(data => {
                this.setState({contacts:data})
            })
            .catch(err => {throw new Error(err)})
            this.setState({modForm:"Create group"}) 
        }
    }

    getContactInfo(groupId){
        fetch("http://localhost:8080/api/contact/contactbycontactGroup/"+groupId)
        .then(response => response.json())
        .then(data => {
            console.log("id contact "+data.idContact)
           
                 this.setState({contacts:data})
    
            
        })
        .catch(err => {throw new Error(err)})
    }
    getGroupInfo(groupId){
        fetch("http://localhost:8080/api/groupContact/"+groupId)
        .then(response => response.json())
        .then(data => {
            this.setState({
                groupId:groupId,
                groupName:data.groupName})
        })
        .catch(err => {throw new Error(err)}) 
       
    } 

    handleChange(event){
        const {name,value} = event.target
        this.setState({ [name]:value})
    }

    handleSubmit(modeButton){

        if (this.state.modForm==="Create group"){
           this.createContactGroup()
        }
        else {
            this.updateContactGroup()
        }
        
    }

    createContactGroup(){
        
        fetch("http://localhost:8080/api/groupContact/fullcontactgroup", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'POST',
                body : JSON.stringify({
                    groupName:this.state.groupName,
                    contacts:this.state.contacts
                })
            })
            .then(response => {
                
                    this.setState({groupId:response.groupId})
                    this.props.handleStateHeaderChange("manageGroups","allContactGroups")
            })
            .catch(err => {
                console.log(err);
            });
           
    }

    updateContactGroup(){
        console.log(" update contact group")
        fetch("http://localhost:8080/api/groupContact/" + this.state.groupId, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'PUT',
                body : JSON.stringify({
                    groupName:this.state.groupName,
                    contacts:this.state.contacts
                })
            })
            .then(response => {
                this.props.handleStateHeaderChange("manageGroups","allContactGroups")
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteContactGroup(){
        console.log(this.state.groupId)
        fetch("http://localhost:8080/api/groupContact/"+this.state.groupId, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'DELETE',
            })
            .then(response => {
                this.props.handleStateHeaderChange("manageGroups","allContactGroups")
            })
            .catch(err => {
                console.log(err);
            });
    }
     
   

    onSelectionChanged=(event)=>{
        console.log(this.state.contacts)
        console.log("la colonne selectionné "+event.api.getSelectedRows().idContact)
        this.setState({
                contacts : event.api.getSelectedRows()
        })
        console.log(this.state.contacts)
     }
     onGridReady = (params) => {
            console.log("grid is ready"+this.state.contacts)
         fetch("http://localhost:8080/api/contact/").then(resp => resp.json())
              .then(resp => {
                console.log(resp)
                params.api.applyTransaction({ add: this.state.contacts  }) //adding API data to grid
              })

    }
     
    
    render(){
        return(
            <Form>
               
                <div class="border border-primary" style={{ marginBottom: '40px' }}>
                    <Form.Row>
                     <Form.Group as={Col} controlId="formGridFname">
                        
                       <Form.Label>Group Name</Form.Label>
                        <Form.Control type="text" placeholder="Group Name" 
                            value={this.state.groupName} name="groupName" onChange={this.handleChange}/>
                     </Form.Group>
                    </Form.Row>
                    <Form.Row> 
                        <Form.Group as={Col} controlId="formGridTitleContact">
                             <h1><strong>Please, choose any contact you want to add in the new group</strong></h1>
                        </Form.Group>
                    </Form.Row>
                        <Form.Row>
                             <div className="ag-theme-alpine" style={{ height: '200px',  width: '1400px'}}>
                                        <AgGridReact
                                        columnDefs={[
                                            { headerName: "Id", field: "idContact", checkboxSelection:true,headerCheckboxSelection:true },
                                            { headerName: "Last name", field: "lname",},
                                            { headerName: "First name", field: "fname", },
                                            { headerName: "Email", field: "email", },
                                          ]}
                                        defaultColDef={{sortable: true,
                                            editable: true,
                                            flex: 1, filter: true,
                                            floatingFilter: true
                                         } }
                                        onGridReady={this.onGridReady}
                                        rowSelection={'multiple'}
                                        onSelectionChanged={this.onSelectionChanged}
                                        rowMultiSelectWithClick={true}
                                        >
                                        </AgGridReact>
                            </div> 
                          </Form.Row>  
                </div>
                {
                    this.state.modForm === "Update contact group" ? 
                    <div style={{ marginBottom: '20px' }}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            startIcon={<CreateIcon />}
                            onClick={() => { 
                                    if (window.confirm('Are you sure you want to update this contact group?')) 
                            this.handleSubmit() }}>
                        {this.state.modForm}
                        </Button>   

                        <Button 
                        variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={() => { 
                                if (window.confirm('Are you sure you want to delete this contact group?'))
                                    this.deleteContactGroup()}}>
                                    Delete contact group
                        </Button> 
                        </div>
                        : 
                        <div style={{ marginBottom: '20px' }}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            startIcon={<PersonAddIcon />}
                            onClick={() => { 
                                if (window.confirm('Are you sure you want to create this contact group?')) 
                            this.handleSubmit()  }}> Create Group
                        </Button>  
                </div>
                }
                
            </Form>

        )
    }
}

export default FormComponentGroup
