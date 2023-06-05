import cron from 'node-cron';
import { Email } from '../models/Emails';
import { SendEmail } from '../services/Sendgrid';

/*
    Integrated cron job for updating manually closed positions
    Running every 4 minutes and 50 seconds
*/
// cron.schedule('*/4 */1 * * *', async () => {
//   try {
//     const emails = await Email.find({}).lean()

//     emails.forEach((email) => {
//       SendEmail(email.email, "Title", "text")
//     })
//   } catch (err) {
    
//   }
// });
