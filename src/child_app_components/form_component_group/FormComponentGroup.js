import React from "react"
import {Form,Col} from "react-bootstrap"

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Table from 'react-bootstrap/Table'
import MultiSelect from "react-multi-select-component";


class FormComponentGroup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modForm:"",  
            groupId:"",
            groupName:"",
            idContact:"",
            allContact:[],
            values:[],
            lname:"",
            fname:"",
            email:"",
            contact: [{idContact:"1",lname:"bff", fname:"fgfg",email:"fggf"}]
           
        }
        
        
        //this.getGroup = this.getGroup.blind(this)
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
             this.getGroup(this.props.groupId)
        }
        else {
            fetch("http://localhost:8080/api/contact/")
            .then(response => response.json())
            .then(data => {
                this.setState({allContact:data})
            })
            .catch(err => {throw new Error(err)})
            this.setState({modForm:"Create group"}) 
        }
    }

    
    getGroup(groupId){
        fetch("http://localhost:8080/api/groupContact/"+groupId)
        
        .then(response => response.json())
        .then(data => {
            console.log(data)
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
    handleChangeSelection = (e) => {

        let value = Array.from(e.target.selectedOptions, option => option.value);
        console.log("c"+value.idContact)
       this.setState({contact: value});
       
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
                    contact:this.contact
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
    
    buildContactComponent(e){
        
       
        const contactsComponent = ( <div>
        <label>       
              < select name="selectOptions" multiple={true} onChange={this.handleChangeSelection}  value={this.state.selectOptions}>
                      { this.state.allContact.map(item => 
                   <option value={item}>Contact {item.idContact} : First Name {item.fname} Last Name {item.lname} Email {item.email}</option>
                        )  }
              </select>
        </label>
        </div>)
        
                
                
        return contactsComponent

              
       
    }
    /**
    MultipleSelect() {
        const classes = useStyles();
        const theme = useTheme();
        const [personName, setPersonName] = React.useState([]);
      
        const handleChange = (event) => {
          setPersonName(event.target.value);
        };
      
        const handleChangeMultiple = (event) => {
          const { options } = event.target;
          const value = [];
          for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
              value.push(options[i].value);
            }
          }
          setPersonName(value);
        };
    }
 */
   
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
                        <Form.Label>Please, choose any contact you want to add in the new group</Form.Label>
                                <tbody>
                                     {this.buildContactComponent()}
                                </tbody>
                       
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
                            this.handleSubmit()  }}>
                    
                </Button>   
                </div>
                }
                
            </Form>

        )
    }
}

export default FormComponentGroup
