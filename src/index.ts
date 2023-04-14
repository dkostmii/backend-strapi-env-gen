import config from './config'
import writeEnv from './env'
import generateToken from './generateToken'

import path from 'path'

const { generatedDir, envFileName } = config
const envPath = path.join(generatedDir, envFileName)

writeEnv(
  {
    HOST: '0.0.0.0',
    PORT: 1337,
    APP_KEYS: new Array(4).fill('').map((_) => generateToken()),
    API_TOKEN_SALT: generateToken(),
    ADMIN_JWT_SECRET: generateToken(),
    JWT_SECRET: generateToken(),
    TRANSFER_TOKEN_SALT: generateToken()
  },
  envPath
)
