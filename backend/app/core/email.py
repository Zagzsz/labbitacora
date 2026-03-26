import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import get_settings

settings = get_settings()

def send_email(to_email: str, subject: str, body: str):
    """Send an email using SMTP."""
    msg = MIMEMultipart()
    msg["From"] = settings.EMAIL_FROM
    msg["To"] = to_email
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "html"))

    try:
        with smtplib.SMTP_SSL(settings.EMAIL_HOST, settings.EMAIL_PORT) as server:
            server.login(settings.EMAIL_FROM, settings.EMAIL_PASSWORD)
            server.send_message(msg)
        return True
    except Exception as e:
        print(f"❌ Error sending email: {e}")
        return False

def send_verification_code(to_email: str, code: str, purpose: str):
    """Send a verification code via email."""
    subjects = {
        "register": "Código de verificación para LabBitácora",
        "reset_password": "Código para restablecer contraseña - LabBitácora"
    }
    
    titles = {
        "register": "Verifica tu cuenta",
        "reset_password": "Restablecer contraseña"
    }
    
    messages = {
        "register": "Gracias por registrarte en LabBitácora. Usa el siguiente código para completar tu registro:",
        "reset_password": "Has solicitado restablecer tu contraseña. Usa el siguiente código:"
    }

    body = f"""
    <html>
        <body style="font-family: sans-serif; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h2 style="color: #818cf8;">{titles.get(purpose, "Verificación")}</h2>
                <p>{messages.get(purpose, "Tu código de verificación es:")}</p>
                <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 25px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #111;">{code}</span>
                </div>
                <p style="font-size: 14px; color: #666;">Este código expirará en 15 minutos.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #999;">Si no solicitaste este código, puedes ignorar este mensaje.</p>
            </div>
        </body>
    </html>
    """
    
    return send_email(to_email, subjects.get(purpose, "Código de verificación"), body)
