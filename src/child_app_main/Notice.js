import React from "react"
import {Form,Button,Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

class Notice extends React.Component{

    constructor(){
        super()
        this.state={
            phones: [{phoneNumber:"",phoneKind:""}]
        }
        this.handlePhoneChange = this.handlePhoneChange.bind(this)
    }

    componentDidMount(){
        console.log("load notice")
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

    render(){
        return (
                <Form>
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
                </Form>    
        )
    }    
}

export default Notice