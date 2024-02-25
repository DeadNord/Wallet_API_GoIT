const { MAIL_API_KEY } = process.env;
const { MAIL_SECRET_KEY } = process.env;

const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(MAIL_API_KEY, MAIL_SECRET_KEY, {
  config: {},
  options: {},
});

const VerificationEmail = process.env.EMAIL;

const SendMsg = async data => {
  const request = mailjet.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: {
          Email: VerificationEmail,
          Name: VerificationEmail,
        },
        To: [
          {
            Email: data.to,
          },
        ],
        Subject: data.subject,
        TextPart: data.text,
        HTMLPart: data.html || '',
      },
    ],
  });

  try {
    const result = await request;
    console.log(result.body);
    return true;
  } catch (error) {
    console.log(error.statusCode);
    return false;
  }
};

module.exports = { SendMsg };
