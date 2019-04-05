const clone = require('clone')
const config = require('./config')

const db = {}

const defaultData = {
  contacts: [
    {
      id: 'abinash',
      name: 'Abinash Kanti Ghoash',
      email: 'akg@monstar-lab-bd.com',
      avatarURL: config.origin + '/abinash.jpg'
    },
    {
      id: 'anik',
      name: 'Anjum Riashat',
      email: 'anjum-vai@monstar-lab-bd.com',
      avatarURL: config.origin + '/anjumvai.jpg'
    },
    {
      id: 'sola',
      name: 'Sulaiman Khan',
      email: 'sulaiman@monstar-lab-bd.com',
      avatarURL: config.origin + '/sulaiman.jpg'
    }
  ]
}

const get = (token) => {
  let data = db[token]

  if (data == null) {
    data = db[token] = clone(defaultData)
  }

  return data
}

const add = (token, contact) => {
  if (!contact.id) {
    contact.id = Math.random().toString(36).substr(-8)
  }

  get(token).contacts.push(contact)

  return contact
}

const remove = (token, id) => {
  const data = get(token)
  const contact = data.contacts.find(c => c.id === id)

  if (contact) {
    data.contacts = data.contacts.filter(c => c !== contact)
  }

  return { contact }
}

module.exports = {
  get,
  add,
  remove
}
