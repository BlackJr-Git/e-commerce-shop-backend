const mailjet = require("node-mailjet").apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

function sendMail(mailSubject, mailTitle, user, order) {
  const productsHTML = order.orderItems
    .map(
      (product) =>
        `<li style="margin-bottom: 5px;">${product.quantity}x <strong>${product.product.name} </strong> - ${product.price} each</li>`
    )
    .join("");

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
        Subject: mailSubject,
        TextPart: mailTitle,
        HTMLPart: `
        <h3>Salut ${user.firstName}, Bienvenue sur <a href='https://nawtech.vercel.app/' style="text-decoration: none; color: #1A82E2;">Nawtech</a> !</h3>
        <p style="font-size: 16px; color: #555555;">Votre commande a bien été reçu et est en cours de traitement</p>
        <p style="font-size: 16px; color: #555555;">Voici le récapitulatif de votre commande :</p>
        <ul style="list-style-type: none; padding: 0;">${productsHTML}</ul>
        <p style="font-weight: bold; color: #444444;">Total : ${order.total}</p> 
        <p style="font-weight: bold; color: #444444;">Statut : ${order.status}</p>
        <p style="font-weight: bold; color: #444444;">Id de la commande : ${order.id}</p>
        <p style="font-weight: bold; color: #444444;">Merci d'avoir choisi notre service.</p>`,
        CustomID: `${order.id}`,
      },
    ],
  });
  request
    .then((result) => {
      // console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
}

module.exports = { sendMail: sendMail };
