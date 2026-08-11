import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import userModel from '@/models/user.models';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


const sendEmail = async ({ email, mailType, userId }: { email: string, mailType: string, userId: string }) => {
    try {
        const hash = await bcryptjs.hash(userId.toString(), 10);

        let user = null;

        if (mailType === "VERIFY") {
            user = await userModel.findByIdAndUpdate(userId, {
                verifyToken: hash,
                verifyTokenExpiry: Date.now() + 15 * 60 * 1000
            }, {
                new: true, runValidators: true
            });
        } else if (mailType === "RESET") {
            user = await userModel.findByIdAndUpdate(userId, {
                forgotPasswordToken: hash,
                forgotPasswordTokenExpiry: Date.now() + 15 * 60 * 1000
            }, {
                new: true, runValidators: true
            });
        }

        if (!user) {
            throw new Error("User id is not valid");
        }

        const url = `${process.env.DOMAIN}/verify-email?token=${hash}`;

        const mailOptions = {
            from: process.env.MAIL_FROM,
            to: email,
            subject: mailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href=${url}>here </a> to ${mailType === "VERIFY" ? "Verify your email" : "Reset your password"}</p>`
        }

        await transporter.sendMail(mailOptions);

    } catch (error: any) {
        console.error(error);
        throw new Error(error.response?.data.message);
    }
}

export default sendEmail;