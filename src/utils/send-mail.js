const mailjet = require("node-mailjet").apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_API_SECRET
  );


function sendMail(mailSubject,mailTitle, user , order) {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "juniorassosa@gmail.com",
          Name: "Junior",
        },
        To: [
          {
            Email: user.email,
            Name: user.name,
          },
        ],
        Subject: mailSubject ,
        TextPart: mailTitle ,
        HTMLPart:
          "<h3>Salut Junior, welcome to <a href='https://nawtech.vercel.app/'>Nawtech</a>!</h3>  <br />May the delivery force be with you! ",
        CustomID: "AppGettingStartedTest",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
}

module.exports = { sendMail : sendMail } 