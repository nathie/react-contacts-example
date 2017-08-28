import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                    {this.props.contacts.map((contact) => (
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