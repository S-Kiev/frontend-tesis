import { FC, useState } from 'react';
import styles from './ResetPassword.module.scss';
import logo from 'assets/EnergiaNaturalNA.png';
import loginImg from 'assets/LoginImg.jpg';
import SendCodeForm from 'components/resetPasswordForms/sendCodeForm';
import ResetPasswordForm from 'components/resetPasswordForms/resetPasswordForm';

interface ResetPasswordProps {}

const ResetPassword: FC<ResetPasswordProps> = () => {
  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<number | null>(null);

  return (
    <section className={`h-100 ${styles.form}`} style={{ backgroundColor: '#eee' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div className="text-center">
                      <img src={logo} alt="logo" className={styles.logo} />
                      <h4 className="mt-1 mb-4 pb-1">Bienvenido a Restablecer contraseña</h4>
                    </div>
                    {step === 1 && <SendCodeForm setStep={setStep} setUser={setUser} />}
                    {step === 2 && <ResetPasswordForm setStep={setStep} user={user} />}
                  </div>
                </div>
                <div className="d-none d-lg-block col-lg-6 d-flex align-items-center">
                  <img src={loginImg} alt="loginImg" className={styles.loginImg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
