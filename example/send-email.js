// Send FusionExport files as attachments via mail

const nodemailer = require('nodemailer');
const path = require('path');

// Require FusionExport
const { ExportManager, ExportConfig } = require('../');

// Instantiate ExportManager
const exportManager = new ExportManager();

// Instantiate ExportConfig and add the required configurations
const exportConfig = new ExportConfig();

// nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "<SENDER'S EMAIL>",
    pass: "<SENDER'S PASSWORD>",
  },
});

exportConfig.set('chartConfig', path.join(__dirname, 'resources', 'multiple.json'));
exportConfig.set('templateFilePath', path.join(__dirname, 'resources', 'template.html'));
exportConfig.set('type', 'pdf');

exportManager
  .export(exportConfig, '.', true)
  .then((exportedFiles) => {
    transporter.sendMail({
      sender: "<SENDER'S EMAIL>",
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
