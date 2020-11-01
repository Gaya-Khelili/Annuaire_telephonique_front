import React from "react"
import {Form,Button,Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

class FormComponent extends React.Component{
    constructor(){
        super()
        this.state = {
            modForm:"",
            idContact:"",
            firstname:"",
            lastname:"",
            email:"",
            street:"",
            city:"",
            zip:"",
            country:"",
            kind:""
        }

        this.getContactInfo = this.getContactInfo.bind(this)
        this.getAddressInfo = this.getAddressInfo.bind(this)
        this.getPhoneInfo = this.getPhoneInfo.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.createContact = this.createContact.bind(this)
    }

    componentDidMount(){
        if (this.props.caller === "detailContact") {
            this.setState({modForm:"Update contact"})
            this.getContactInfo()
            this.getAddressInfo()
            this.getPhoneInfo()
        }
        else {
            this.setState({modForm:"Create contact"}) 
        }
    }

    getContactInfo(){
        console.log("a")
    }

    getAddressInfo(){
        console.log("a")
    }

    getPhoneInfo(){
        console.log("a")
    }

    handleChange(event){
        const {name,value} = event.target
        this.setState({ [name]:value})
    }

    handleSubmit(){

        if (this.state.modForm==="Create contact"){
           this.createContact()
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
                    console.log(response.idContact)
                    this.createAddress(response.idContact)
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
            </Form>

        )
    }
}

export default FormComponent
