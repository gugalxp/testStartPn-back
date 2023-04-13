const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../../config/smtp");
const User = require("../models/User");

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
    const { email } = req.body;

    const userExists = await User.findOne({
      where: {
        email: email,
      },
    });

    if (userExists === null) {
      throw new Error("E-mail não encontrado!");
    }

    let resonseEmailSent = userExists;

    const link = "https://test-start-pn-front.vercel.app/newPassword";

    const corpoEmail = `
    <p>Você solicitou uma redefinição de senha em nosso site.</p>
    <p>Para redefinir sua senha, clique no link abaixo:</p>
    <a href="${link}">${link}</a>
    <p>Este link expira em uma hora.</p>
  `;

    await transporter.sendMail({
      subject: "Vaga JR StartPn",
      from: `StartPn <${SMTP_CONFIG.user}>`,
      to: email,
      html: corpoEmail,
    });

    res.json({
      resonseEmailSent,
      message: "E-mail enviado com sucesso!",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = send;
