import './App.css';
import Header from "./child_app_components/Header"
import React from "react"
import CreateContact from './child_app_components/CreateContact';
import ManageContacts from './child_app_components/ManageContacts';
import CreateGroup from './child_app_components/CreateGroup';
import ManageGroups from './child_app_components/ManageGroups';
import Notice from './child_app_components/Notice';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
      headerItem: ""
    }
    this.handleStateHeaderChange=this.handleStateHeaderChange.bind(this)
  }

  handleStateHeaderChange(newHeaderState){

    if (this.state.headerItem != newHeaderState){

      this.setState({headerItem: newHeaderState})
  
    }  
  }

  displayMainComponent(){
      
        switch(this.state.headerItem){
            case "createContact":
              return <CreateContact />;
            case "manageContacts":
              return <ManageContacts />;
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
