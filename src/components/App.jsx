import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Phonebook } from './Phonebook/Phonebook';

import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLS = localStorage.getItem('contacts');
    if (contactsFromLS) {
      const parsedContactsFromLS = JSON.parse(contactsFromLS);
      this.setState({ contacts: parsedContactsFromLS });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const nameChecker = this.state.contacts.find(
      contact => contact.name === name
    );
    if (nameChecker) {
      Notify.warning(`Contact ${name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
    Notify.success(`Contact ${name}: ${number} added successfully`);
  };

  delContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    Notify.success('Contact has been deleted');
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  showContacts = () => {
    return this.state.contacts.filter(c =>
      c.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  render() {
    return (
      <div className="container">
        <div className="components-list">
          <h1 className={css.componentHeader}>
            GoIT #15
            <br />
            <span className={css.subHeader}>React.JS - Module 4</span>
            <br />
            <span className={css.secSubHeader}>task: </span>
            <span className={css.subHeader}>'Phonebook'</span>
          </h1>
          <Section title="Phonebook">
            <Phonebook onSubmit={this.addContact} />
          </Section>
          <Section title="Contacts">
            <Filter value={this.state.filter} onChange={this.changeFilter} />
            <ContactsList
              contacts={this.showContacts()}
              onDelContact={this.delContact}
            />
          </Section>
        </div>
      </div>
    );
  }
}

export default App;
