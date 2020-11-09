import './App.css';
import Header from "./child_app_components/Header"
import React from "react"
import CreateContact from './child_app_main/CreateContact';
import ManageContacts from './child_app_main/ManageContacts';
import CreateGroup from './child_app_main/CreateGroup';
import ManageGroups from './child_app_main/ManageGroups';
import Notice from './child_app_main/Notice';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      headerItem: "",
      parameter:""
    }
    this.handleStateHeaderChange=this.handleStateHeaderChange.bind(this)
  }

  handleStateHeaderChange(newHeaderState,parameter){

    if (this.state.headerItem !== newHeaderState){

      this.setState({headerItem: newHeaderState,
                    parameter:parameter})
  
    }  
  }

  displayMainComponent(){
      
        switch(this.state.headerItem){
            case "createContact":
              return <CreateContact modForm="createContact" idContact="" 
                      handleStateHeaderChange={this.handleStateHeaderChange}/>;
              case "detailsContact":
                return <CreateContact modForm="detailsContact" idContact={this.state.parameter}
                        handleStateHeaderChange={this.handleStateHeaderChange}/>;
            case "manageContacts":
              return <ManageContacts handleStateHeaderChange={this.handleStateHeaderChange} 
                                    modSelection={this.state.parameter === "" ? "allContacts" : this.state.parameter}/>;
            case "manageContactsUpdated":
                return <ManageContacts handleStateHeaderChange={this.handleStateHeaderChange} 
                                    modSelection={this.state.parameter === "" ? "allContacts" : this.state.parameter}/>;
            case "createGroup":
                return <CreateGroup />;
            case "manageGroups":
              return <ManageGroups />;
            default : 
              return <Notice />

        }
  }


  render(){
    return (
      <div className="App">
         <header>
              <Header handleStateHeaderChange={this.handleStateHeaderChange}/>
          </header>
          <br></br>
          <main>
              {this.displayMainComponent()}
          </main>
      </div>
    )
  }
}

export default App;
