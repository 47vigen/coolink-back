import path from 'path'
import merge from 'lodash/merge'

const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.config({
    path: path.join(__dirname, '../.env'),
    example: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    server: process.env.SERVER || 'http://localhost:3000',
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET'),
    jwtRefreshSecret: requireProcessEnv('JWT_REFRESH_SECRET'),
    jwtEmailSecret: requireProcessEnv('JWT_EMAIL_SECRET'),
    cookieSecret: requireProcessEnv('COOKIE_SECRET'),
    instagram: {
      enable: requireProcessEnv('IG_ENABLE') === '1' || false,
      botUsername: requireProcessEnv('IG_BOT_USERNAME'),
      botPassword: requireProcessEnv('IG_BOT_PASSWORD')
    },
    email: {
      host: requireProcessEnv('EMAIL_HOST'),
      port: requireProcessEnv('EMAIL_PORT'),
      user: requireProcessEnv('EMAIL_USER'),
      password: requireProcessEnv('EMAIL_PASSWORD'),
      from: requireProcessEnv('EMAIL_FROM')
    },
    mongo: {
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
      }
    }
  },
  test: {},
  development: {
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/back-gql-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/back-gql'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
