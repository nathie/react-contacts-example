import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ""
    }

    updateQuery = (query) => {
        /*
            Updating State:
            setStates helps to change the state of a component
            and let React to know about it.
            You shouldn't set the state directly.
            setStates can receive a function which will past
            the previous state as 1st arg.
            -can receive an object that can be merge with the current one.

            it re-render the entire app

            'Your UI is just a FUNCTION of your STATE'
        */
        this.setState({ query: query.trim() })
    }

    render() {
        // Variable that will match the pattern
        let showingContacts
        if (this.state.query) {
            // match is the result of a new instance of the regular expression
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            // showingContact will have the contacts that match the query
            showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
        } else {
            showingContacts = this.props.contacts
        }

        showingContacts.sort(sortBy('name'))

        return (
            <div className='list-contacts'>
               <div className='list-contacts-top'>
                    <input className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
               </div>

                <ol className='contact-list'>
                    {showingContacts.map((contact) => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }}/>
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}

export default ListContacts;