const nodemailer = require("nodemailer");
const envConfig = require("../config/configEnv.js");

const isGmail = envConfig.SMTP_HOST && envConfig.SMTP_HOST.includes("gmail");

const transporterConfig = isGmail 
    ? {
        service: "gmail",
        auth: {
            user: envConfig.SMTP_USER,
            pass: envConfig.SMTP_PASS
        }
      }
    : {
        host: envConfig.SMTP_HOST,
        port: envConfig.SMTP_PORT,
        secure: envConfig.SMTP_PORT === 465,
        auth: {
            user: envConfig.SMTP_USER,
            pass: envConfig.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
      };

const transporter = nodemailer.createTransport(transporterConfig);

const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: `"Admin Panel" <${envConfig.SMTP_USER}>`,
        to,
        subject: "Your OTP Verification Code",
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 12px;">
                <div style="text-align: center; margin-bottom: 24px;">
                    <h1 style="color: #1e293b; font-size: 24px; margin: 0;">OTP Verification</h1>
                </div>
                <div style="background: white; padding: 32px; border-radius: 8px; border: 1px solid #e2e8f0;">
                    <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                        You've requested a password reset. Use the verification code below to proceed:
                    </p>
                    <div style="text-align: center; margin: 24px 0;">
                        <span style="display: inline-block; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; font-size: 32px; font-weight: 700; letter-spacing: 8px; padding: 16px 32px; border-radius: 8px;">
                            ${otp}
                        </span>
                    </div>
                    <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 20px 0 0;">
                        This code will expire once used. Do not share it with anyone.
                    </p>
                </div>
                <p style="color: #94a3b8; font-size: 11px; text-align: center; margin-top: 16px;">
                    If you didn't request this, please ignore this email.
                </p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail };
