import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'
import PropTypes from 'prop-types'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;

  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const onLogout = () => {
    logout();
    clearContacts();
  }

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li><a onClick={onLogout} href="#!"><i className='fas fa-sign-out-alt'>
        <span className='hide-sm'>Logout</span></i></a>
      </li>
    </Fragment>
  );

  const guessLinks = (
    <Fragment>
      <li><Link to='/about'>About</Link></li>
      <li><Link to='/register'>Register</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </Fragment>
  )

  return (
    <div className='navbar bg-primary'>
      <h1><i className={icon} /> {title}</h1>
      <ul>
        {isAuthenticated ? authLinks : guessLinks}
      </ul>
    </div>
  )
}
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
};

export default Navbar