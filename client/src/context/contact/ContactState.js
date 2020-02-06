import React, { useReducer } from 'react'
import ContactContext from './contactContext'
import ContactReducer from './contactReducer'
import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, FILTER_CONTACTS, CLEAR_CONTACTS, CONTACT_ERROR, SET_CURRENT, CLEAR_CURRENT, CLEAR_FILTER } from '../types'

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'John Doe',
        email: 'jdoe@yahoo.com',
        phone: '123-456-1234',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Mary Smith',
        email: 'msmith@yahoo.com',
        phone: '444-456-1234',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Jane Anna',
        email: 'jaan@yahoo.com',
        phone: '666-456-1234',
        type: 'professional'
      }
    ]
  }

  const [state, dispatch] = useReducer(ContactReducer, initialState);
  //add contact

  //delete contact

  //set current contact

  //clear current contact

  // update contact

  // filter contact

  //clear filter

  return (
    <ContactContext.Provider value={{
      contacts: state.contacts
    }}>
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState