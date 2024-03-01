import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';
import { Phonebook } from './Phonebook/Phonebook';

import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromLS = localStorage.getItem('contacts');
    if (contactsFromLS) {
      const parsedContactsFromLS = JSON.parse(contactsFromLS);
      setContacts(parsedContactsFromLS);
    }
  }, []);

  useEffect(
    (_, prevState) => {
      if (contacts !== prevState) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    },
    [contacts]
  );

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    const nameChecker = contacts.find(contact => contact.name === name);
    if (nameChecker) {
      Notify.warning(`Contact ${name} is already in contacts`);
      return;
    }

    setContacts(prevState => [contact, ...prevState]);
    Notify.success(`Contact ${name}: ${number} added successfully`);
  };

  const delContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
    setFilter('');
    Notify.success('Contact has been deleted');
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const showContacts = () => {
    const flatFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(flatFilter)
    );
  };

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
          <Phonebook onSubmit={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={changeFilter} />
          <ContactsList contacts={showContacts()} onDelContact={delContact} />
        </Section>
      </div>
    </div>
  );
}

export default App;
