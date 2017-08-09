import React, { Component } from 'react';

class ContactList extends React.Component {
  render() {
    const people = this.props.contacts;
    return <ol>
      {people.map(person => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ol>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactList contacts={[
          { name: "Michael" },
          { name: "Jose" },
          { name: "Mario" }
        ]} />
        <ContactList contacts={[
          { name: "Gleidy" },
          { name: "Roman" },
          { name: "Zoe" }
        ]} />
      </div>
    );
  }
}

export default App;
