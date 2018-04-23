const express = require("express");
const app = express();
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
          clientId: "570244468695-caqa90t5hh3i62elngu7d3ob4p20lsfk.apps.googleusercontent.com",
          clientSecret: "Itqi7B4yRT4yFgmlhcbMmv1O",
          refreshToken: "1/L5zc1SD-VWSX8w_UWo-n6XvBTCEs6wG3xEU130LhMr9IC8n7wWgIRqMVeBRoMvxM",
          accessToken: "ya29.GlulBTROs8IA8CvSeY6FOOLBrJ-0cckjTAdytDt7Vd-4sjrFcY9Me_xuS5fWl3ikc-RAXqAXo16QayJ7jTl4nY7XVqn7qKcEcB6pjcxPm7uMPz6E0vtW25SPeTZs",
        },
      });
      
      let HelperOptions = {
        from: `${con_name} <john@gmail.com>`,
        to: 'hqdang97@gmail.com',
        subject: 'Message From Portfolio',
        text: `${con_message} - from ${con_name} <${con_email}>`
      };
      
      
      
        transporter.sendMail(HelperOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log("The message was sent!");
          console.log(info);
        });
})
app.use(express.static('build/'))
app.listen(port, () => {
    console.log("Server is listening on port " + port);
})

