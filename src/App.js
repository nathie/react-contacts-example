import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
    screen: 'list', // Screen to be loaded by default: create || list
    contacts: []
  }

  // Lifecycle Event to bring data from server after DOM
  // have been loaded
  // Ajax calls MUST be done only with this method
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
        this.setState({ contacts })
    })
  }

  //Remove contact function
  removeContact = (contact) => {
    // Removes contact from the view
    this.setState((state) => ({
        contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    // Removes contact from the API
    ContactsAPI.remove(contact)
  }
  render() {
    return (
      <div>
        {this.state.screen === 'list' && (
            <ListContacts
                contacts={this.state.contacts}
                onDeleteContact={this.removeContact}
                onNavigate={() => {
                    this.setState({ screen: 'create' })
                }}
            />
        )}

        {this.state.screen === 'create' && (
            <CreateContact/>
        )}
      </div>
    )
  }
}

export default App;