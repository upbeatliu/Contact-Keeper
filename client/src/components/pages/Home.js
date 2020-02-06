import React from 'react'
import Contact from './../contacts/Contacts'

export const Home = () => {
  return (
    <div className='grid-2'>
      <div>{/* Contact From */}</div>
      <div>
        <Contact />
      </div>
    </div>
  )
}

export default Home