const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../../config/smtp");
const { sign } = require("jsonwebtoken");

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

    const token = sign(
      {
        email,
      },
      "4da87c28b002243bc25fff6b2a4b7fd6",
      {
        expiresIn: "1h",
      }
    );

    const link = `https://localhost:3000/redefinir-senha?token=${token}`;

    const corpoEmail = `
    <p>Você solicitou uma redefinição de senha em nosso site.</p>
    <p>Para redefinir sua senha, clique no link abaixo:</p>
    <a href="${link}">${link}</a>
    <p>Este link expira em uma hora.</p>
  `;

    await transporter.sendMail({
      subject: "Vaga JR StartPn",
      from: `Gustavo Arruda <${SMTP_CONFIG.user}>`,
      to: email,
      html: corpoEmail,
    });
    next();
    return res.json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    return res.json({
      error: "Houve algum problema ao tentar enviar o e-mail!" + error.message,
    });
  }
}

module.exports = send;
