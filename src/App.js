import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
  state = {
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
        <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}/>
      </div>
    )
  }
}

export default App;