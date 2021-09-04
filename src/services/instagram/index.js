import { writeFile, readFile, access } from 'fs'

import { IgApiClient } from 'instagram-private-api'
import { withFbns } from 'instagram_mqtt'
import Promise from 'bluebird'

import { coolinkBotUsername, coolinkBotPassword } from '../../config'

const writeFileSync = Promise.promisify(writeFile)
const readFileSync = Promise.promisify(readFile)
const accessSync = Promise.promisify(access)

export const getIg = async () => {
  const ig = withFbns(new IgApiClient())
  ig.state.generateDevice(coolinkBotUsername)

  // this will set the auth and the cookies for instagram
  await readState(ig)

  // this logs the client in
  await loginToInstagram(ig)

  // you received a notification
  ig.fbns.on('push', logEvent('push'))

  // the client received auth data
  // the listener has to be added before connecting
  ig.fbns.on('auth', async (auth) => {
    // logs the auth
    logEvent('auth')(auth)

    // saves the auth
    await saveState(ig)
  })

  // 'error' is emitted whenever the client experiences a fatal error
  ig.fbns.on('error', logEvent('error'))
  // 'warning' is emitted whenever the client errors but the connection isn't affected
  ig.fbns.on('warning', logEvent('warning'))

  // this sends the connect packet to the server and starts the connection
  // the promise will resolve once the client is fully connected (once /push/register/ is received)
  // await ig.fbns.connect();

  // you can pass in an object with socks proxy options to use this proxy
  // await ig.fbns.connect({socksOptions: {host: '...', port: 12345, type: 4}});
  console.log('ig here')
  return ig
}

async function saveState(ig) {
  return writeFileSync('state.json', await ig.exportState(), { encoding: 'utf8' })
}

async function readState(ig) {
  if (!(await accessSync('state.json'))) return
  await ig.importState(await readFileSync('state.json', { encoding: 'utf8' }))
}

async function loginToInstagram(ig) {
  ig.request.end$.subscribe(() => saveState(ig))
  const login = await ig.account.login(coolinkBotUsername, coolinkBotPassword)
  console.log(login)
}

/**
 * A wrapper function to log to the console
 * @param name
 * @returns {(data) => void}
 */
function logEvent(name) {
  return (data) => console.log(name, data)
}
