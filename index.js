require('dotenv').config();
const express = require("express");
const app = express();
// const port = process.env.PORT || 80;
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");
const Email = require("email-templates");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(bodyParser.json());
// app.use(sphp.express('build/mail.php'));
app.post("/mail", (req, res) => {
    const {con_name, con_email, con_message } = req.query
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: "hqdang97@gmail.com",
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: process.env.ACCESS_TOKEN
        },
      });
      
      let HelperOptions = {
        from: `${con_name} <${con_email}>`,
        to: 'hqdang97@gmail.com',
        subject: 'Message From Portfolio',
        text: `${con_message} - from ${con_name} <${con_email}>`
      };
      
      
      
        transporter.sendMail(HelperOptions, (error, info) => {
          if (error) {
            return res.status(500).send("Oops! Something went wrong and we couldn't send your message.");
          }
          res.status(200).send("Thank You! Your message has been sent.")
        });
})
app.use(express.static('build/'))
app.listen(port, () => {
    console.log("Server is listening on port " + port);
})

