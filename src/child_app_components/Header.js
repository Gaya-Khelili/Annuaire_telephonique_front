import React from "react"
import {Nav, Form, Button,Navbar,FormControl} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component{
  constructor(){
    super()
  }


  render() {
    return(
      <Navbar bg="dark" variant="dark">

          <Navbar.Brand href="#manage_your_contacts"onClick={() => this.props.handleStateHeaderChange("")} >
              Manage your contacts :  </Navbar.Brand>

          <Nav className="mr-auto">

            <Nav.Link href="#create_contact" onClick={() => this.props.handleStateHeaderChange("createContact","")}>
                Create contact</Nav.Link>

            <Nav.Link href="#manage_contacts" onClick={() => this.props.handleStateHeaderChange("manageContacts","allContacts")}>
                Manage contacts</Nav.Link>

            <Nav.Link href="#create_group" onClick={() => this.props.handleStateHeaderChange("createGroup","")}>
                Create group</Nav.Link>

            <Nav.Link href="#manage_groups" onClick={() => this.props.handleStateHeaderChange("manageGroups","")}>
                Manage groups</Nav.Link>

          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search a contact" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
      </Navbar>
    )
  }
}

export default Header