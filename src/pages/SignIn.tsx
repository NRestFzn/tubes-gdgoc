import styles from '../styles/SignIn.module.css';

import logo from '../assets/mochi.jpg';
import viewEye from '../assets/viewEye.png';
import hideEye from '../assets/hideEye.png';

import {useState} from 'react';
import {LoginIcon} from '../components/SvgIcons';

import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

type AuthErrorType = 'invalid-credentials' | 'generic';

const SignIn: React.FC = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorType, setErrorType] = useState<AuthErrorType | null>(null);

  const togglePassword = (): void => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErrorType(null); // clear errors if any
      navigate('/dashboard'); // redirect on success
    } catch (error: unknown) {
      if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        if (msg.includes('auth/user-not-found') || msg.includes('wrong-password')) {
          setErrorType('invalid-credentials');
        } else {
          setErrorType('generic');
        }
      } else {
        setErrorType('generic');
      }
    }
  };

  return (
    <div className={styles.background}>
      <div>
        <header className={styles.header}>
          <div className={styles.logo}>
            <img src={logo} alt="mochi-travel-logo" />
            <p>Mochi Travel</p>
          </div>

          <div className={styles.headerButtons}>
            <button>Sign in</button>
            <button>Sign Up</button>
          </div>
        </header>

        <div className={styles.loginBox}>
          <div className={styles.svgContainer}>
            <LoginIcon className={styles.icon} />
          </div>

          <div className={styles.title}>
            <p>Sign in with email</p>
            <p>Your travel management companion, all in one place.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputContainer}>
              <input 
                type="text" 
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className={styles.eyeIcon}
                onClick={togglePassword}
                tabIndex={0}
                style={{
                  WebkitMaskImage: `url(${showPassword ? viewEye : hideEye})`,
                  maskImage: `url(${showPassword ? viewEye : hideEye})`,
                }}
              ></div>
            </div>

            <p>Forgot password?</p>

            <button type="submit">Start working</button>

            {errorType === 'invalid-credentials' && (
              <ErrorCard msg="wrong credentials" />
            )}

            {errorType === 'generic' && (
              <ErrorCard msg="unknown error" />
            )}

            <p>Or sign in with</p>
          </form>

          <div className={styles.thirdPartyContainer}>
            <div className={styles.googleLogin}></div>
            <div className={styles.facebookLogin}></div>
            <div className={styles.appleLogin}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ErrorCard: React.FC<string> = (msg: string): React.ReactElement => {
  return (
    <div className={styles.errorCard}>
      <p>${msg}</p>
    </div>
  )
}

export default SignIn;
