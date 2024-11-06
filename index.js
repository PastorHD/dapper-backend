const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors()); // Permite la comunicación entre el frontend y el backend
app.use(express.json()); // Para manejar JSON en el cuerpo de la solicitud

// Configuración de transporte de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', // Correo Electronico
    pass: '' // Contraseña aquí, en caso de contar con Verificación de dos pasos, generar contraseña de Aplicación
  }
});

// Endpoint para enviar correo
app.post('/send-email', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: 'email-de-ejemplo@gmail.com',
    to: email,
    subject: 'Bienvenido',
    text: '¡Gracias por suscribirte! Te damos la bienvenida.'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo');
    } else {
      console.log('Correo enviado: ' + info.response);
      res.status(200).send('Correo enviado correctamente');
    }
  });
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
