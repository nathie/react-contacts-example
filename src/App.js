import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
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

  // Creates a new contact and adds it to the list
  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
        this.setState(state => ({
            contacts: state.contacts.concat([ contact ])
        }))
    })
  }

  render() {
    return (
        <div>
            <Route exact path='/' render={() => (
                <ListContacts
                    contacts={this.state.contacts}
                    onDeleteContact={this.removeContact}
                />
            )}/>

            <Route path='/create' render={({ history }) => (
                <CreateContact
                    onCreateContact={(contact) => {
                        this.createContact(contact)
                        history.push('/')
                    }}
                />
            )}/>
        </div>
    )
  }
}

export default App;