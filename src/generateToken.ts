import crypto from 'crypto'
import config from './config'

function generateToken() {
  const { tokenBytes } = config

  return crypto.randomBytes(tokenBytes).toString('base64')
}

export default generateToken
