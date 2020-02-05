const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const User = require('../models/User');

//@route - GET api/contacts 
//@desc - Get all users contacts 
//@access - Private (only itself see it)
router.get('/', auth, async (req, res) => {
  //res.send('Get all contacts');

  try {
    const contact = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error.');
  }
});

//@route - POST api/contacts 
//@desc - Add new contact
//@access - Private
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty()]], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // res.send('Add contact');
    const { name, email, phone, type } = req.body;
    try {
      newContact = new Contact({ name, email, phone, type, user: req.user.id });
      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

//@route - PUT api/contacts/:id
//@desc - Update contact 
//@access - Private
router.put('/:id', auth, async (req, res) => {
  // res.send('Update contact');

  const { name, email, phone, type } = req.body;
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact no found' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized: id' });
    }
    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route - DELETE api/contacts/:id
//@desc - Delete contact 
//@access - Private
router.delete('/:id', auth, async (req, res) => {
  //res.send('Delete contact');
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: 'Contact no found' });

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized: id' });
    }
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router