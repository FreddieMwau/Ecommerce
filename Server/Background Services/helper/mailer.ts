import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
dotenv.config()

function createTransport(config:any){
    let transport = nodemailer.createTransport(config)
    return transport
}

const configuration = {
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PASS as string
    }
}

const sendMail = async (mailOption:any) => {
    const transporter = createTransport(configuration)
    await transporter.verify()
    await transporter.sendMail(mailOption)
}

export default sendMail