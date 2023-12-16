import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsTitle } from './ContactsTitle/ContactsTitle';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const getContactsStorage = () => {
  const contactsStorage = localStorage.getItem('contacts');
  return JSON.parse(contactsStorage) ?? [];
}

export const App = () => {
  const [contacts, setContacts] = useState(getContactsStorage);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const addContact = newContact => {
    const isExist = contacts.some(({ name, number }) => name.toLowerCase() === newContact.name.toLowerCase() || number === newContact.number)

    if (isExist) {
      return alert(`${newContact.name}: is already in contacts`);
    }

    setContacts(contacts => [{ ...newContact, id: nanoid() }, ...contacts]);
  }

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId))
  }

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value)
  };

  const filterContact = () => {
    const normalized = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalized)
    );
  };

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onAddContact={addContact}></ContactForm>
        <ContactsTitle title="Contacts"></ContactsTitle>
        <Filter value={filter} onChange={changeFilter}></Filter>
        <ContactList
          contacts={filterContact()}
          onDelete={deleteContact}
        ></ContactList>
      </Section>
    </div>
  );
}
