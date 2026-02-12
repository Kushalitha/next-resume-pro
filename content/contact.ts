/**
* Next Resume Pro v2.0.0
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

export const contact = {
  // Message shown above the contact form (editable)
  contactBlurb:
    "Have an idea, a creative brief or just want to say hello? I love collaborating on thoughtfully designed, accessible web experiences and photographic projects. Tell me what you're thinking (a short summary is perfect) — I usually reply within 2 business days.",

  // Map location string used for the embedded Google Maps URL (editable)
  // Example: "Auckland, New Zealand" or numeric coords "-43.5321,172.6362"
  mapLocation: 'Auckland, New Zealand',

  // Owner / recipient contact details (editable)
  owner: {
    name: 'Kushalitha Maduranga',
    location: 'Auckland, New Zealand',
    email: 'hello@kushalitha.example'
  },

  // Where contact form submissions should be sent by server-side email sending
  // Note: Do NOT store API keys here; set provider credentials in environment variables
  // Preferred pattern: the app will use process.env.CONTACT_TO_EMAIL or this fallback.
  sendTo: 'hello@kushalitha.example',
  replyTo: 'no-reply@example.com',

  // Email provider hint (for documentation): set provider env vars (e.g. SMTP_*). Using 'smtp' is recommended for open-source/self-hosted mail servers.
  // provider: 'sendgrid' | 'mailgun' | 'smtp' (just informational)
  provider: 'smtp'
};