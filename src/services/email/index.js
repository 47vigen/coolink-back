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

export const sendMail = (to, subject, html) => {
  email.sendMail({ to, html, subject, from: emailConfig.from }, (err) => {
    if (err) return console.log(err)
  })
}

export const sendConfirmMail = (to, token) =>
  sendMail(
    to,
    'تایید حساب کاربری',
    `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <title>تایید حساب کاربری</title>
      <!--[if !mso]><!-->
      <!--<![endif]-->
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }

        table,
        td,
        tr {
          vertical-align: top;
          border-collapse: collapse;
        }

        * {
          line-height: inherit;
        }

        a[x-apple-data-detectors=true] {
          color: inherit !important;
          text-decoration: none !important;
        }
      </style>
      <style type="text/css" id="media-query">
        @media (max-width: 550px) {

          .block-grid,
          .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }

          .block-grid {
            width: 100% !important;
          }

          .col {
            width: 100% !important;
          }

          .col_cont {
            margin: 0 auto;
          }

          img.fullwidth,
          img.fullwidthOnMobile {
            width: 100% !important;
          }

          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
          }

          .no-stack.two-up .col {
            width: 50% !important;
          }

          .no-stack .col.num2 {
            width: 16.6% !important;
          }

          .no-stack .col.num3 {
            width: 25% !important;
          }

          .no-stack .col.num4 {
            width: 33% !important;
          }

          .no-stack .col.num5 {
            width: 41.6% !important;
          }

          .no-stack .col.num6 {
            width: 50% !important;
          }

          .no-stack .col.num7 {
            width: 58.3% !important;
          }

          .no-stack .col.num8 {
            width: 66.6% !important;
          }

          .no-stack .col.num9 {
            width: 75% !important;
          }

          .no-stack .col.num10 {
            width: 83.3% !important;
          }

          .video-block {
            max-width: none !important;
          }

          .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px;
          }

          .desktop_hide {
            display: block !important;
            max-height: none !important;
          }

          .img-container.big img {
            width: auto !important;
          }
        }
      </style>
    </head>

    <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #05c46b;">
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #05c46b; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="#05c46b" valign="top">
        <tbody>
          <tr style="vertical-align: top;" valign="top">
            <td style="word-break: break-word; vertical-align: top;" valign="top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#05c46b"><![endif]-->
              <div style="background-color:transparent;">
                <div class="block-grid " style="min-width: 320px; max-width: 530px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #f1f1f1;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:#f1f1f1;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:530px"><tr class="layout-full-width" style="background-color:#f1f1f1"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="530" style="background-color:#f1f1f1;width:530px; border-top: none; border-left: none; border-bottom: 1px solid #D9D9D9; border-right: none;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr bgcolor='#05C46B'><td colspan='3' style='font-size:7px;line-height:16px'>&nbsp;</td></tr><tr><td style='padding-top:16px;padding-bottom:16px' width='16' bgcolor='#05C46B'><table role='presentation' width='16' cellpadding='0' cellspacing='0' border='0'><tr><td>&nbsp;</td></tr></table></td><td style="padding-right: 16px; padding-left: 16px; padding-top:16px; padding-bottom:16px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 530px; display: table-cell; vertical-align: top; width: 498px;">
                      <div class="col_cont" style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:16px solid #05C46B; border-left:16px solid #05C46B; border-bottom:1px solid #D9D9D9; border-right:16px solid #05C46B; padding-top:16px; padding-bottom:16px; padding-right: 16px; padding-left: 16px;">
                          <!--<![endif]-->
                          <div class="img-container center autowidth" align="center" style="padding-right: 0px;padding-left: 0px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><a href="https://coolink.ir" target="_blank" style="outline:none" tabindex="-1"><img class="center autowidth" align="center" border="0" src="https://coolink.ir/images/coolink-logo.png" alt="coolink" title="coolink" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 160px; max-width: 100%; display: block;" width="160"></a>
                            <!--[if mso]></td></tr></table><![endif]-->
                          </div>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><td style='padding-top:16px;padding-bottom:16px' width='16' bgcolor='#05C46B'><table role='presentation' width='16' cellpadding='0' cellspacing='0' border='0'><tr><td>&nbsp;</td></tr></table></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color:transparent;">
                <div class="block-grid " style="min-width: 320px; max-width: 530px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #f1f1f1;">
                  <div style="border-collapse: collapse;display: table;width: 100%;background-color:#f1f1f1;">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:530px"><tr class="layout-full-width" style="background-color:#f1f1f1"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="530" style="background-color:#f1f1f1;width:530px; border-top: 0px solid transparent; border-left: none; border-bottom: none; border-right: none;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style='padding-top:5px;padding-bottom:5px' width='16' bgcolor='#05C46B'><table role='presentation' width='16' cellpadding='0' cellspacing='0' border='0'><tr><td>&nbsp;</td></tr></table></td><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div class="col num12" style="min-width: 320px; max-width: 530px; display: table-cell; vertical-align: top; width: 498px;">
                      <div class="col_cont" style="width:100% !important;">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div style="border-top:0px solid transparent; border-left:16px solid #05C46B; border-bottom:16px solid #05C46B; border-right:16px solid #05C46B; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
                          <!--<![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 16px; padding-left: 16px; padding-top: 16px; padding-bottom: 16px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                          <div style="color:#2d2d2d;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:16px;padding-right:16px;padding-bottom:16px;padding-left:16px;">
                            <div class="txtTinyMce-wrapper" style="line-height: 1.2; font-size: 12px; font-family: Tahoma, Verdana, Segoe, sans-serif; color: #2d2d2d; mso-line-height-alt: 14px;">
                              <p dir="rtl" style="margin: 0; text-align: center; font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;">کاربر گرامی کولینک،</span></p>
                              <p dir="rtl" style="margin: 0; text-align: center; font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;">از اینکه به جمع ما اضافه شدین بسیار خوشحالیم و به خود می بالیم :)</span></p>
                              <p dir="rtl" style="margin: 0; text-align: center; font-size: 14px; line-height: 1.2; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 14px;">این ایمیل جهت تایید حساب کاربری شما در کولینک ارسال شده است. شما با فعال سازی حساب خود می توانید از تمامی امکانات کولینک به رایگان استفاده کنید. برای فعال سازی بر روی دکمه زیر کلیک کنید!</span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <div class="button-container" align="center" style="padding-top:0px;padding-right:16px;padding-bottom:0px;padding-left:16px;">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 0px; padding-right: 16px; padding-bottom: 0px; padding-left: 16px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://coolink.ir/confirm/${token}" style="height:30pt;width:349.5pt;v-text-anchor:middle;" arcsize="20%" stroke="false" fillcolor="#05c46b"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Tahoma, Verdana, sans-serif; font-size:16px"><![endif]--><a href="https://coolink.ir/confirm/${token}" target="_blank" style="-webkit-text-size-adjust: none; text-decoration: none; display: block; color: #ffffff; background-color: #05c46b; border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; width: 100%; width: calc(100% - 2px); border-top: 1px solid #05c46b; border-right: 1px solid #05c46b; border-bottom: 1px solid #05c46b; border-left: 1px solid #05c46b; padding-top: 4px; padding-bottom: 4px; font-family: Tahoma, Verdana, Segoe, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"><span style="padding-left:4px;padding-right:4px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span style="font-size: 16px; margin: 0; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><strong>فعالسازی حساب کاربری</strong></span></span></a>
                            <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                          </div>
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 16px; padding-left: 16px; padding-top: 0px; padding-bottom: 0px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                          <div style="color:#9ca3af;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:0px;padding-right:16px;padding-bottom:0px;padding-left:16px;">
                            <div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.2; color: #9ca3af; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 17px;">
                              <p dir="rtl" style="margin: 0; font-size: 12px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 14px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 12px;">در صورتی که درخواست ساخت حساب کاربری از سمت شما داده نشده است، این ایمیل را نادیده بگیرید.</span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                          <div style="color:#393d47;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                            <div class="txtTinyMce-wrapper" style="font-size: 14px; line-height: 1.2; color: #393d47; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 17px;">
                              <p dir="rtl" style="margin: 0; font-size: 12px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 14px; margin-top: 0; margin-bottom: 0;"><span style="font-size: 12px;"><strong>با سپاس تیم کولینک</strong></span></p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><td style='padding-top:5px;padding-bottom:5px' width='16' bgcolor='#05C46B'><table role='presentation' width='16' cellpadding='0' cellspacing='0' border='0'><tr><td>&nbsp;</td></tr></table></td></tr><tr bgcolor='#05C46B'><td colspan='3' style='font-size:7px;line-height:16px'>&nbsp;</td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if (IE)]></div><![endif]-->
    </body>
    </html>
    `
  )
