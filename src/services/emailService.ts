import emailjs from '@emailjs/nodejs';

export async function sendVerificationCode(email: string, code: number, firstName: string) {
    try {
      const templateParams = {
        from_name: 'Dourbia Team',
        to_name: `${firstName}`,
        destinataire: `${email}`,
        message: "Veuillez retourner à l'application Dourbia pour introduire le code suivant :",
        code: `${code}`,
        message2: 'Ce code est valable 10 minutes.',
      };
  
      const response = await emailjs.send('service_g5umsa8', 'template_ljhp0cq', templateParams, {
        publicKey: '2yo733rwBPBD-EE_o',
        privateKey: 'dxptoS4-0S5jCb4sxDQVG',
      });
  
      console.log('Email response:', response.status, response.text);
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle the error appropriately, e.g., log it or throw a custom error.
    }
  }
