const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../../config/smtp");

const transporter = nodemailer.createTransport({
  host: SMTP_CONFIG.host,
  port: SMTP_CONFIG.port,
  secure: true,
  auth: {
    user: SMTP_CONFIG.user,
    pass: SMTP_CONFIG.pass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function send(req, res, next) {
  try {
    await transporter.sendMail({
      text: "TEXTO DA MENSAGEM",
      subject: "ASSUNTO",
      from: `Gustavo Arruda <${SMTP_CONFIG.user}>`,
      to: ["gustavoleone3456@gmail.com", "gustavoleone3456@hotmail.com"],
    });
    next();
    return res.json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    return res.json({ error: "Houve algum problema ao tentar enviar o e-mail!" });
  }
}

module.exports = send;
