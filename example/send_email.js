/* Send FusionExport files as attachments via mail

 * Sending email using package - nodemailer (https://nodemailer.com)

 * Provide your SMTP details for settiing up (line no. 28).

 * If this is something new for you, try using https://mailtrap.io for quickly getting started.

 * If you are using Gmail, read the setup instructions here - https://nodemailer.com/usage/using-gmail

 * Finally, provide email metadata (details like subject, to, from) while sending email (line no. 43).
 */

const nodemailer = require('nodemailer');
const path = require('path');

// Require FusionExport
const { ExportManager, ExportConfig } = require('..');

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

// nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  auth: {
    user: "9217733c3a014f",
    pass: "39564c5d1ddd00",
  },
});

exportConfig.set('chartConfig', path.join(__dirname, 'resources', 'multiple.json'));
exportConfig.set('templateFilePath', path.join(__dirname, 'resources', 'template.html'));
exportConfig.set('type', 'pdf');

exportManager
  .export(exportConfig, '.', true)
  .then((exportedFiles) => {
    transporter.sendMail({
      from: "<SENDER'S EMAIL>",
      to: "<RECEIVERS'S EMAIL>",
      subject: 'FusionExport',
      text: 'Hello,\n\nKindly find the attachment of FusionExport exported files.\n\nThank you!',
      attachments: exportedFiles.map((exportedFile, index) => ({
        filename: `export${index === 0 ? '' : `-${index}`}.pdf`,
        path: exportedFile,
        contentType: 'application/pdf',
      })),
    }, (error) => {
      if (error) {
        console.log('FusionExport Node Client: error sending mail - ', error);
      } else {
        console.log('FusionExport Node Client: email sent');
      }
    });
  })
  .catch((err) => {
    console.log('FusionExport Node Client: error exporting charts - ', err);
  });
