import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'

class CreateContact extends Component {

  // Handles the form submit
  handleSubmit = (e) => {
    e.preventDefault()
    // Does the same as the browser does but
    // in this case creates an object instead
    const values = serializeForm(e.target, { hash: true })

    // Now we pass the form values to the onCreateContact method
    if (this.props.onCreateContact)
        this.props.onCreateContact(values)
  }
  render() {
    return (
      <div>
        <Link className='close-create-contact' to='/'>Close</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            <input type='text' name='name' placeholder='Name'/>
            <input type='text' name='email' placeholder='Email'/>
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact
