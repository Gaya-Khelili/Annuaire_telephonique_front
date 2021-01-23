import React from "react"
import {Form,Col,InputGroup} from "react-bootstrap"

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CreateIcon from '@material-ui/icons/Create';
//import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridColumn, AgGridReact,gridApi } from 'ag-grid-react';

class FormComponentGroup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modForm:"",  
            groupId:"",
            contactsid:[{idContact:""}],
            groupName:"",
            idContact:"",
            contacts:[{idContact:"",lname:"",fname:"",email:""}],
            contactsInGroup:[{idContact:"",lname:"",fname:"",email:""}],
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
        this.getAllContactInfo = this.getAllContactInfo.bind(this)
        this.getGroupInfo = this.getGroupInfo.bind(this)
        this.onRowSelected = this.onRowSelected.bind(this)
        this.onGridReady = this.onGridReady.bind(this)
        this.getAnotherContact = this.getAnotherContact.bind(this)
        this.onGridReadyContactInGroup = this.onGridReadyContactInGroup.bind(this)
            
            
    }


    componentDidMount(){
        
        if (this.props.caller === "detailsContactGroup") {
            console.log("detail group contact")
            this.setState({modForm:"Update contact group"})
            this.setState({
                groupId : this.props.groupId
            })
            this.getGroupInfo(this.props.groupId)
            this.getContactInfo(this.props.groupId)
        }
        else if(this.props.caller === "deleteContactGroup"){
            this.deleteContactGroup(this.props.groupId)
        }
        else if(this.props.caller === "addContact"){
           this.setState({
               groupId : this.props.groupId
           })
            this.setState({modForm:"Add contacts to the group"})
            this.getAllContactInfo()
            this.getContactInfo(this.props.groupId)
            this.getAnotherContact()
            
        }
        else if(this.props.caller === "deleteContact"){
            this.setState({
                groupId : this.props.groupId
            })
            console.log(this.props.groupId)
            this.getGroupInfo(this.props.groupId)
            this.getContactInfo(this.props.groupId)// que les contacts qui sont dans le group
            this.setState({modForm:"Delete contacts"})
            
        }
        
    }
    
    getAllContactInfo(){
        fetch("http://localhost:8080/api/contact")
        .then(response => response.json())
        .then(data => {
            this.setState({contacts:data})
        })
        .catch(err => {throw new Error(err)})

    }
    getContactInfo(groupId){
        fetch("http://localhost:8080/api/contact/contactbycontactGroup/"+groupId)
        .then(response => response.json())
        .then(data => {           
                 this.setState({contactsInGroup:data})
            
        })
        .catch(err => {throw new Error(err)})
    }
    getAnotherContact(){ 
         
        var contenue = [{idContact:"",lname:"",fname:"",email:""}]
        /**
        this.state.contacts.forEach((c,idc) =>{
            this.state.contactsInGroup.forEach((cg,id)=>{
                if(idc === id){
                    if(c.idContact === cg.idContact){
                        contenue.concat([{idContact:c.idContact,lname:c.lname,fname:c.fname,email:c.email}])
                        console.log("gd"+c.idContact)
                     }
                }
                
            })

        })**/
         this.setState({
            contacts  : contenue
        })
      
        
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

       
           this.createContactGroup()
        
        
    }

    createContactGroup(){
        
        fetch("http://localhost:8080/api/groupContact", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'POST',
                body : JSON.stringify({
                    groupName:this.state.groupName
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
        
        fetch("http://localhost:8080/api/contact/contactGroup", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'PUT',
                body : JSON.stringify({
                    groupId:this.state.groupId,
                    groupName:this.state.groupName
                })
            })
            .then(response => {
                this.props.handleStateHeaderChange("manageGroups","allContactGroups")
            })
            .catch(err => {
                console.log(err);
            });
    }

    addContacts(){
        console.log("Id "+this.state.groupId)
        console.log(this.state.contactsid.idContact)
        fetch("http://localhost:8080/api/contact/addContacts" , {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
              },
            method: 'PUT',
            body : JSON.stringify({
                groupId:this.state.groupId,
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
    deleteContact(){
        fetch("http://localhost:8080/api/contact/deleteContacts", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
              },
            method: 'DELETE',
            body : JSON.stringify({
                groupId:this.state.groupId,
                groupName:this.state.groupName,
                contacts:this.state.contactsInGroup
                
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
        console.log("kjj"+this.state.groupId)
        fetch("http://localhost:8080/api/groupContact/contactGroup/"+this.state.groupId, {
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
    
    // hundleDeleteContact = idx => () => {
    //     this.setState({
    //         contacts: this.state.contacts.filter((c, sidx) => idx !== sidx)
    //     });
    //   };
    //   hundleAddAnotherContact = () => {
    //     this.setState({
    //       contacts: this.state.contacts.concat([{idContact:"contact.idContact",lname:"contact.lname",fname:"contact.fname",email:"contact.email"}])
    //     });
    //   };


    // onSelectionChanged=(event)=>{
        
    //     this.setState({
    //             contacts : event.api.getSelectedNodes()
    //     })
    //     event.api.getSelectedNodes().map((contact, id) => {
    //         console.log("select"+contact.idContact)
    //     })

    //  }

    onRowSelected(event) {
        if(event.node.isSelected() === true){
           
          this.setState({
         contacts: this.state.contacts.concat([{idContact:event.node.data.idContact,lname:event.node.data.lname,fname:event.node.data.fname,email:event.node.data.email}])
            });
                   
                    window.alert(event.node.data.idContact)
        }
        else if(event.node.isSelected() === false){
            this.setState({
                contacts: this.state.contacts.filter((p, sidx) => (event.node.idContact) !== sidx)
            });
            window.alert(event.node.data.idContact)
         
        }
       
      
      }

     onGridReady = (params) => {
       
         fetch("http://localhost:8080/api/contact/").then(resp => resp.json()) // ça ne s'utilise pas
             .then(resp => {
                 console.log(resp)
                params.api.applyTransaction({ add: this.state.contacts  }) //adding API data to grid
             })

    }
    

    onGridReadyContactInGroup = (params) => {
                fetch("http://localhost:8080/api/contact/contactbycontactGroup/"+this.state.groupId).then(resp => resp.json()) // ça ne s'utilise pas
                    .then(resp => {
                        console.log(resp)
                        params.api.applyTransaction({ add: this.state.contactsInGroup  }) //adding API data to grid
                    })
    }
    
    render(){

        
           if(this.state.modForm === "Add contacts to the group" ){

            return(
                
                <div style={{ marginBottom: '20px' }}>

            <div>
            <Form.Row> 
                <Form.Group as={Col} controlId="formGridTitleContact">
                    <h1><strong>Please, choose any contacts you want to add in this group</strong></h1>
                </Form.Group>
            </Form.Row>
                <Form.Row>
                    <div className="ag-theme-alpine" style={{ height: '500px',  width: '1750px'}}>
                           
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
                                onRowSelected={this.onRowSelected}
                                rowMultiSelectWithClick={true}
                                >
                                </AgGridReact>
                    </div> 
                
                        </Form.Row>
                        
                        <div style={{ marginBottom: '20px' }}>
                                        <Button 
                                        variant="contained" 
                                        color="primary"
                                        startIcon={<PersonAddIcon />}
                                        onClick={() => { 
                                            if (window.confirm('Are you sure you want to add those contacts in this group?')) 
                                        this.addContacts()  }}> Add contacts
                                    </Button> 
                     </div>
                        </div>

                </div>
                )

            }
        else if(this.state.modForm === "Delete contacts" ){
                return(
                    <div style={{ marginBottom: '20px' }}>

                    <div>
                    <Form.Row> 
                        <Form.Group as={Col} controlId="formGridTitleContact">
                            <h1><strong>Please, choose any contacts you want to delete from this group</strong></h1>
                        </Form.Group>
                    </Form.Row>
                        <Form.Row>
                            <div className="ag-theme-alpine" style={{ height: '500px',  width: '1750px'}}>
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
                                        onGridReady={this.onGridReadyContactInGroup}
                                        rowSelection={'multiple'}
                                        onRowSelected={this.onRowSelected}
                                        rowMultiSelectWithClick={true}
                                        >
                                        </AgGridReact>
                            </div> 
                        
                                </Form.Row>
                                
                                <div style={{ marginBottom: '20px' }}>
                                

                                            <Button 
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => { 
                                                    if (window.confirm('Are you sure you want to delete those contacts from this group?'))
                                                            this.deleteContact()}}>
                                                            Delete contacts
                                         </Button>
                             </div>
                                </div>
        
                        </div>               
                )
        }
        else if(this.state.modForm === "Update contact group"){
            return (
                <div>
            <div className="border border-primary" style={{ marginBottom: '20px' }}>
            <Form.Row>
             <Form.Group as={Col} controlId="formGridFname">
                
               <Form.Label>Group Name</Form.Label>
                <Form.Control type="text" placeholder="Group Name" 
                    value={this.state.groupName} name="groupName" onChange={this.handleChange}/>
             </Form.Group>
            </Form.Row>
         </div>

                
                <div className="ag-theme-alpine" style={{ height: '500px',  width: '1750px'}}>
                            <AgGridReact
                            columnDefs={[
                             { headerName: "Id", field: "idContact",},
                                { headerName: "Last name", field: "lname",},
                                { headerName: "First name", field: "fname", },
                                { headerName: "Email", field: "email", },
                            ]}
                            defaultColDef={{sortable: true,
                                editable: true,
                                flex: 1, filter: true,
                                floatingFilter: true
                            } }
                            onGridReady={this.onGridReadyContactInGroup}
                            rowSelection={'multiple'}
                            onSelectionChanged={this.onSelectionChanged}
                            rowMultiSelectWithClick={true}
                            >
                            </AgGridReact>
                </div> 

                <Button 
                            variant="contained" 
                            color="primary"
                            startIcon={<CreateIcon />}
                            onClick={() => { 
                                    if (window.confirm('Are you sure you want to update this contact group?')) 
                            this.updateContactGroup() }}>
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
            )
        }
        else{
        return(

            <Form>
           

                <div className="border border-primary" style={{ marginBottom: '40px' }}>
                    <Form.Row>
                     <Form.Group as={Col} controlId="formGridFname">
                        
                       <Form.Label>Group Name</Form.Label>
                        <Form.Control type="text" placeholder="Group Name" 
                            value={this.state.groupName} name="groupName" onChange={this.handleChange}/>
                     </Form.Group>
                    </Form.Row>
                 </div>
                    <div style={{ marginBottom: '20px' }}>
                              </div>                 
                
           
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
           
            </Form>

        )
        }
    }
}

export default FormComponentGroup
