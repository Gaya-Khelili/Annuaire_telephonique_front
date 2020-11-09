import React from "react"
import {Form,Button,Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

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

                {
                    this.state.modForm === "Update contact" ?
                    <Form.Row>
                    {this.state.phones.map((phone, idx) => (
                        <div className="phone">
                         
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
                         
                        </div>
                    ))}
                       </Form.Row>
                       : ""
                }
                

                {
                    this.state.modForm === "Create contact" ?
                    <Form.Row>
                    {this.state.phones.map((phone, idx) => (
                        <div className="phone">
                         
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
                            
                            <Button
                                variant="primary" type="button"
                                onClick={this.handleAddPhone}
                                className="small"
                            >
                                Add phone
                            </Button>

                            <Button
                                variant="primary" type="button"
                                onClick={this.handleRemovePhone(idx)}
                                className="small"
                            >
                                Remove phone
                            </Button>
                         
                        </div>
                    ))}
                       </Form.Row>
                       : ""
                }
                
                
                
                <Button variant="primary" type="button" onClick={() => { 
                    if (window.confirm('Are you sure you want to create/update this contact?')) 
                        this.handleSubmit() }}>
                    {this.state.modForm}
                </Button>   
            
                {
                    this.state.modForm === "Update contact" ? 
                        <Button variant="primary" type="button" onClick={() => { 
                                if (window.confirm('Are you sure you want to delete this contact?'))
                            this.deleteContact()}}>
                            Delete contact
                        </Button> : ""
                }
                
            </Form>

        )
    }
}

export default FormComponent
