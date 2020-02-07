import React from 'react'
import ContactForm from './../contacts/ContactForm'
import Contact from './../contacts/Contacts'

export const Home = () => {
  return (
    <div className='grid-2'>
      <div><ContactForm /></div>
      <div>
        <Contact />
      </div>
    </div>
  )
}

export default Home