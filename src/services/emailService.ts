import emailjs from '@emailjs/nodejs';

export async function sendVerificationCode(email, code, firstName) {
  try {
    // Template parameters
    const templateParams = {
      from_name: 'MatchMate Team',
      to_name: firstName,
      destinataire: email,
      message: "Veuillez retourner à l'application MatchMate pour introduire le code suivant :",
      code: `${code}`, // Ensure code is a string
      // message2: '', // Assuming this is an additional message
    };

   
    // Sending email using EmailJS

    
    const response = await emailjs.send('service_g5umsa8', 'template_ljhp0cq', templateParams, {
						publicKey: '2yo733rwBPBD-EE_o',
						privateKey: 'dxptoS4-0S5jCb4sxDQVG',
					})

    // Logging response
    console.log('Email response:', response.status, response.text);
  } catch (error) {
    // Handling errors
    console.error('Error sending email:', error);
    // Optionally, throw a custom error or handle it as needed
  }
}

