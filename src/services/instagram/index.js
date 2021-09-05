import { writeFile, readFile, access } from 'fs'
import path from 'path'

import { IgApiClient } from 'instagram-private-api'
import { withFbns } from 'instagram_mqtt'
import Promise from 'bluebird'
import appRoot from 'app-root-path'

import { coolinkBotUsername, coolinkBotPassword } from '../../config'

const writeFileSync = Promise.promisify(writeFile)
const readFileSync = Promise.promisify(readFile)
const accessSync = Promise.promisify(access)
const igStatePath = path.join(appRoot.toString(), 'states', 'ig.json')

export const IG = withFbns(new IgApiClient())

export const connectIG = async () => {
  IG.state.generateDevice(coolinkBotUsername)

  // this will set the auth and the cookies for instagram
  await readState()

  // this logs the client in
  await loginIG()

  // you received a notification
  IG.fbns.on('push', logEvent('push'))

  // the client received auth data
  // the listener has to be added before connecting
  IG.fbns.on('auth', async (auth) => {
    // logs the auth
    logEvent('auth')(auth)

    // saves the auth
    await saveState()
  })

  // 'error' is emitted whenever the client experiences a fatal error
  IG.fbns.on('error', logEvent('error'))
  // 'warning' is emitted whenever the client errors but the connection isn't affected
  IG.fbns.on('warning', logEvent('warning'))

  // this sends the connect packet to the server and starts the connection
  // the promise will resolve once the client is fully connected (once /push/register/ is received)
  // await ig.fbns.connect();

  // you can pass in an object with socks proxy options to use this proxy
  // await ig.fbns.connect({socksOptions: {host: '...', port: 12345, type: 4}});
  console.log('📸 coonected to instagram')
}

const saveState = async () => {
  return writeFileSync(igStatePath, await IG.exportState(), { encoding: 'utf8' })
}

const readState = async () => {
  if (!(await accessSync(igStatePath))) return
  await IG.importState(await readFileSync(igStatePath, { encoding: 'utf8' }))
}

export const loginIG = async (generateDevice) => {
  console.log('🔐 try to login instagram')

  if (generateDevice) IG.state.generateDevice(coolinkBotUsername)

  try {
    IG.request.end$.subscribe(() => saveState(IG))
    await IG.account.login(coolinkBotUsername, coolinkBotPassword)
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * A wrapper function to log to the console
 * @param name
 * @returns {(data) => void}
 */
function logEvent(name) {
  return (data) => console.log(name, data)
}
