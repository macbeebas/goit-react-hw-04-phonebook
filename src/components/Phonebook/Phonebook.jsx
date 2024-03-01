import React, { useState } from 'react';
import css from './Phonebook.module.css';
import PropTypes from 'prop-types';

export const Phonebook = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = e => {
    setName(e.currentTarget.value);
  };

  const handleChangeNumber = e => {
    setNumber(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    setName('');
    setNumber('');
  };

  return (
    <div className={css.formContainer}>
      <form className={css.formMain} onSubmit={handleSubmit}>
        <label className={css.formLabel}>
          <p>Name</p>
          <input
            className={css.formInput}
            type="text"
            name="name"
            value={name}
            onChange={handleChangeName}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
          />
        </label>
        <label className={css.formLabel}>
          <p>Number</p>
          <input
            className={css.formInput}
            type="text"
            name="number"
            value={number}
            onChange={handleChangeNumber}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.buttonAdd} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

Phonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
