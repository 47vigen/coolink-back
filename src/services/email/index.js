import nodeMailer from 'nodemailer'
import { email as emailConfig } from '../../config'

export const email = nodeMailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  tls: true,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.password
  }
})

export const sendMail = (to, subject, text) => {
  email.sendMail({ to, text, subject, from: emailConfig.from }, (err) => {
    if (err) return console.log(err)
  })
}
