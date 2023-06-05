import sgMail from '@sendgrid/mail';
import env from '../../utils/constants/env';

export const SendEmail = async (to: string, subject: string, text: string) => {
  sgMail.setApiKey(env.sendGridSecret || '');

  const msg = {
    to: to,
    from: 'n.hovo2002@gmail.com',
    subject: subject,
    text: text,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  const data = await sgMail.send(msg);

  return data;
};
