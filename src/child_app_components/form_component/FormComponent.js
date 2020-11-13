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

class FormComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modForm:"",
            idContact:"",
            idAddress:"",
            idPhone:"",
            firstname:"",
            lastname:"",
            email:"",
            street:"",
            city:"",
            zip:"",
            country:"",
            kind:"Perso",
            number:"",
            phones: [{idPhone:"",phoneNumber:"",phoneKind:"Perso"}]
        }

        this.getContactInfo = this.getContactInfo.bind(this)
        this.getAddressInfo = this.getAddressInfo.bind(this)
        this.getPhoneInfo = this.getPhoneInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.createContact = this.createContact.bind(this)
        this.updateContact = this.updateContact.bind(this)
        this.deleteContact = this.deleteContact.bind(this)
    }

    componentDidMount(){
    
        if (this.props.caller === "detailsContact") {
            this.setState({modForm:"Update contact"})
            console.log("idContact "+this.props.idContact)
            this.getContactInfo(this.props.idContact)
            this.getAddressInfo(this.props.idContact)
            this.getPhoneInfo(this.props.idContact)
        }
        else {
            this.setState({modForm:"Create contact"}) 
        }
    }

    getContactInfo(idContact){
        fetch("http://localhost:8080/api/contact/"+idContact)
        .then(response => response.json())
        .then(data => {
            this.setState({
                            idContact:idContact,
                            firstname:data.fname,
                            lastname:data.lname,
                            email:data.email
            })
        })
        .catch(err => {throw new Error(err)})
    }

    getAddressInfo(idContact){
        fetch("http://localhost:8080/api/address/addressbycontact/"+idContact)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.setState({
                            idAddress:data.idAddress,
                            street:data.street,
                            city:data.city,
                            zip:data.zip,
                            country:data.country
            })
        })
        .catch(err => {throw new Error(err)})
    }

    getPhoneInfo(idContact){
        fetch("http://localhost:8080/api/phone/phonesbycontact/"+idContact)
        .then(response => response.json())
        .then(data => {
            this.setState({phones:data})
        })
        .catch(err => {throw new Error(err)})
    }

    handleChange(event){
        const {name,value} = event.target
        this.setState({ [name]:value})
    }

    handleSubmit(modeButton){

        if (this.state.modForm==="Create contact"){
           this.createContact()
        }
        else {
            this.updateContact()
        }
        
    }

    handlePhoneChange = idx => evt => {
        const newPhones = this.state.phones.map((phone, sidx) => {
          if (idx !== sidx) return phone;
          return { ...phone, [evt.target.name]: evt.target.value };
        });
    
        this.setState({ phones: newPhones });
      };

      handleAddPhone = () => {
        this.setState({
          phones: this.state.phones.concat([{ phoneNumber: "",phoneKind:"Perso" }])
        });
      };
    
      handleRemovePhone = idx => () => {
        this.setState({
            phones: this.state.phones.filter((p, sidx) => idx !== sidx)
        });
      };

    createContact(){
        fetch("http://localhost:8080/api/contact/fullcontact", {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'POST',
                body : JSON.stringify({
                    fname:this.state.firstname,
                    lname:this.state.lastname,
                    email:this.state.email,
                    address:{
                        street:this.state.street,
                        city:this.state.city,
                        zip:this.state.zip,
                        country:this.state.country
                    },
                    phones:this.state.phones
                })
            })
            .then(response => {
                
                    this.setState({idContact:response.idContact})
                    this.props.handleStateHeaderChange("manageContacts","allContacts")
            })
            .catch(err => {
                console.log(err);
            });
    }

    updateContact(){
        fetch("http://localhost:8080/api/contact/" + this.state.idContact, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'PUT',
                body : JSON.stringify({
                    fname:this.state.firstname,
                    lname:this.state.lastname,
                    email:this.state.email,
                    address:{
                        idAddress:this.state.idAddress,
                        street:this.state.street,
                        city:this.state.city,
                        zip:this.state.zip,
                        country:this.state.country
                    },
                    phones:this.state.phones
                })
            })
            .then(response => {
                this.props.handleStateHeaderChange("manageContacts","allContacts")
            })
            .catch(err => {
                console.log(err);
            });
    }

    deleteContact(){
        console.log(this.state.idContact)
        fetch("http://localhost:8080/api/contact/"+this.state.idContact, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                  },
                method: 'DELETE',
            })
            .then(response => {
                this.props.handleStateHeaderChange("manageContacts","allContacts")
            })
            .catch(err => {
                console.log(err);
            });
    }

   
    render(){
        return(
            <Form>
                <div class="border border-primary" style={{ marginBottom: '40px' }}>
                    <Form.Row>
                    <Form.Group as={Col} controlId="formGridFname">
                        
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name" 
                            value={this.state.firstname} name="firstname" onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" 
                            value={this.state.lastname} name="lastname" onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                            value={this.state.email} name="email" onChange={this.handleChange}/>
                        </Form.Group>
                    </Form.Row>
                </div>
                
                <div class="border border-primary" style={{ marginBottom: '25px' }}>
                <Form.Group controlId="formGridStreet">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="Address" 
                        value={this.state.street} name="street" onChange={this.handleChange}/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control placeholder="City"
                        value={this.state.city} name="city" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control placeholder="Zip"
                        value={this.state.zip} name="zip" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control placeholder="Country"
                        value={this.state.country} name="country" onChange={this.handleChange}/>
                    </Form.Group>
                </Form.Row>
                </div>
                
                    <div >
                        
                        <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<AddCircleIcon />}
                                onClick={this.handleAddPhone}
                            >
                                Add phone
                            </Button>
                    <br></br>
                    <Form.Row>
                    {this.state.phones.map((phone, idx) => (
                        <div className="phone" class="border" style={{ marginRight: '10px' ,
                                                     marginBottom: '10px'}}>
                         
                            <Form.Group as={Col} controlId="formGridPhoneNumber">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control placeholder={`Phone number #${idx + 1}`}
                                    value={phone.phoneNumber} name="phoneNumber" onChange={this.handlePhoneChange(idx)}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPhoneKind">
                                    <Form.Label>kind of phone</Form.Label>
                                    <Form.Control as="select" defaultValue="Choose..."
                                        value={phone.phoneKind} name="phoneKind" onChange={this.handlePhoneChange(idx)}>
                                        <option>Perso</option>
                                        <option>Pro</option>
                                    </Form.Control >
                                </Form.Group>
                            
                                <IconButton aria-label="delete"
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.handleRemovePhone(idx)}>
                                     <DeleteIcon />
                                 </IconButton>
                                
                        </div>
                    ))}
                       </Form.Row>
                       </div>
            
                {
                    this.state.modForm === "Update contact" ? 
                    <div style={{ marginBottom: '20px' }}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            startIcon={<CreateIcon />}
                            onClick={() => { 
                                    if (window.confirm('Are you sure you want to update this contact?')) 
                            this.handleSubmit() }}>
                        {this.state.modForm}
                        </Button>   

                        <Button 
                        variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}
                            onClick={() => { 
                                if (window.confirm('Are you sure you want to delete this contact?'))
                                    this.deleteContact()}}>
                                    Delete contact
                        </Button> 
                        </div>
                        : 
                        <div style={{ marginBottom: '20px' }}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            startIcon={<PersonAddIcon />}
                            onClick={() => { 
                                if (window.confirm('Are you sure you want to create this contact?')) 
                            this.handleSubmit() }}>
                    {this.state.modForm}
                </Button>   
                </div>
                }
                
            </Form>

        )
    }
}

export default FormComponent
