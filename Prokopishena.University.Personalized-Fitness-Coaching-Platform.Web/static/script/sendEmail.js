const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'outlook',
    secure: false,
    auth: {
        user: 'trainingCoaching.planform@outlook.com',
        pass: 'TrainingPlatform123',
    },
});

async function sendEmail(recipient_email) {
    try {
        await transporter.sendMail({
            from: 'trainingCoaching.planform@outlook.com',
            to: recipient_email,
            subject: 'Welcome email',
            text: 'You registered successfully.',
            html: '<p>Congratulations. You have registered to our Online Training Coaching Platform. Hope our platform will be convenient and useful for you!!!! </p>',
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


module.exports = sendEmail ;