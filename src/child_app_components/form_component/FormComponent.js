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
            number:""
        }

        this.getContactInfo = this.getContactInfo.bind(this)
        this.getAddressInfo = this.getAddressInfo.bind(this)
        this.getPhoneInfo = this.getPhoneInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
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
            console.log(data)
            data.map(phone => 
                this.setState({
                idPhone: phone.idPhone,
                number: phone.phoneNumber,
                kind: phone.phoneKind
                })   
            )
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
                    phones:[{
                        phoneNumber:this.state.number,
                        phoneKind:this.state.kind
                    }]
                })
            })
            .then(response => response.json())
            .then(response => {
                    this.setState({idContact:response.idContact})
                    this.props.handleStateHeaderChange("manageContacts","")
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
                    phones:[{
                        idPhone:this.state.idPhone,
                        phoneNumber:this.state.number,
                        phoneKind:this.state.kind
                    }]
                })
            })
            .then(response => response.json())
            .then(response => {
            })
            .catch(err => {
                console.log(err);
            });
            this.props.handleStateHeaderChange("manageContacts","")
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
            .then(response => response.json())
            .then(response => {
                    console.log(response)
            })
            .catch(err => {
                console.log(err);
            });
        this.props.handleStateHeaderChange("manageContacts","")
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

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridPhoneNumber">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control placeholder="Phone number"
                        value={this.state.number} name="number" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPhoneKind">
                    <Form.Label>kind of phone</Form.Label>
                    <Form.Control as="select" defaultValue="Choose..."
                        value={this.state.kind} name="kind" onChange={this.handleChange}>
                        <option>Perso</option>
                        <option>Pro</option>
                    </Form.Control >
                    </Form.Group>
                </Form.Row>

                
                <Button variant="primary" type="button" onClick={this.handleSubmit}>
                    {this.state.modForm}
                </Button>
            
                {
                    this.state.modForm === "Update contact" ? 
                        <Button variant="primary" type="button" onClick={this.deleteContact}>
                            Delete contact
                        </Button> : ""
                }
                
            </Form>

        )
    }
}

export default FormComponent
