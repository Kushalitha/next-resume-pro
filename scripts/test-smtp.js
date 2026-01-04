/**
* Next Resume Pro v1.0.0
* Author: Kushalitha Maduranga
* Year: 2026
*
* License:
* - Code (TypeScript, JavaScript, build scripts): MIT License
* - UI / Design (CSS, layout, visual components): CC BY 4.0
* 	Attribution Required
*
* Repository:
* https://github.com/Kushalitha
*/

/**
* Next Resume Pro v1.0.0
* Author: Kushalitha Maduranga
* Year: 2026
*
* License:
* - Code (TypeScript, JavaScript, build scripts): MIT License
* - UI / Design (CSS, layout, visual components): CC BY 4.0
* 	Attribution Required
*
* Repository:
* https://github.com/Kushalitha
*/

const nodemailer = require('nodemailer');

async function main() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || '587');
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.EMAIL_TEST_TO;

  if (!host) {
    console.error('SMTP_HOST not set');
    process.exit(1);
  }
  if (!to) {
    console.error('EMAIL_TEST_TO not set');
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({ host, port, secure, auth: user ? { user, pass } : undefined });

  try {
    const info = await transporter.sendMail({
      from: process.env.CONTACT_FROM || `test@example.com`,
      to,
      subject: 'Test SMTP from Next Resume Pro',
      text: 'This is a test email from the Next Resume Pro SMTP test script.'
    });
    console.log('Message sent:', info.messageId || info);
  } catch (err) {
    console.error('SMTP test failed', err);
    process.exit(2);
  }
}

main();
