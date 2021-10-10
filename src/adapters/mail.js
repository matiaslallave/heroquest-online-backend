/**
 * Esto es un adaptador de mail. Su funcion es exponer de forma sencilla
 * El envío de mails a la aplicación nodejs
 */
import nodemailer from "nodemailer"; // importamos la librería para enviar emails

/**
 * Funcion que envía el contenido de un mail (content) con el asunto (subject)
 * a la dirección de destino (to)
 */
export const sendMail = (to, subject, content) => {
  /**
   * Para poder enviar mails necesito un servidor SMTP.
   * Si tengo una cuenta de GMAIL o OUTLOOK podría usarla como servidor SMTP
   * Esta función tiene que crear utilizando la librería `nodemailer`:
   *
   * 1- Conexión con el servidor SMTP a través de una cuenta
   * 2- Crear el mensaje
   * 3- Enviar el mensaje
   */

  // Como esto es un ejemplo utilizaremos un servidor SMTP de prueba, creando una cuenta de prueba
  // En una app real necesitaríamos configurar una cuenta real
  // esto es solo para generar una cuenta de prueba
  //   nodemailer.createTestAccount((err, account) => {
  //     if (err) {
  //       console.error("Failed to create a testing account. " + err.message);
  //     }

  // Creamos la conexión de transporte con nuestro servidor SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // en real sería algo como smtp.gmail.com (servidor SMTP de Gmail)
    port: 465, // en real podría ser 25 (Servidor por defecto de un SMTP)
    secure: true, // si utilizamos la parte segura del protocolo SMTP o no
    auth: {
      // usuario y pass (ej: xxx@gmail.com)
      user: "heroquestonline.matdev@gmail.com",
      pass: "qqtshekxjktkomoj",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // Creamos el mensaje, en este caso en HTML
  const message = {
    from: "HeroQuest Online Admin <heroquestonline.matdev@gmail.com>",
    to, // se lo enviamos a quien nos dice
    subject, // ponemos el asunto
    html: content, // ponemos el contenido
  };

  // utilizamos nuestro transporte SMTP para enviar el mail, indicándole el mensaje.
  // Recibiríamos un callback con el resultado del envío
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return;
    }
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    // esto es solo porque estamos usando una cuenta de pruebas
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  //   });
};
