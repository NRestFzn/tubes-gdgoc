import styles from '../styles/SignIn.module.css';

import logo from '../assets/mochi.jpg';
import viewEye from '../assets/viewEye.png';
import hideEye from '../assets/hideEye.png';

import { useState, useEffect } from 'react';
import { LoginIcon } from '../components/SvgIcons';

import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/firebase';

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
      setErrorType(null); // Clear errors on success
      navigate('/admin/destination'); // Redirect on success
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          setErrorType('invalid-credentials');
        } else {
          setErrorType('generic');
        }
      } else {
        setErrorType('generic');
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setErrorType(null);
      navigate('/admin/destination');

    } catch (error: unknown) {
      setErrorType('generic');
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

            <p>Or sign in with</p>
          </form>

          <div className={styles.thirdPartyContainer}>
            <div className={styles.googleLogin} onClick={loginWithGoogle}></div>
            <div className={styles.facebookLogin}></div>
            <div className={styles.appleLogin}></div>
          </div>
        </div>

        {errorType && (
          <ErrorCard
            msg={errorType === 'invalid-credentials' ? "Invalid credentials" : "Unknown error"}
            visible
          />
        )}
      </div>
    </div>
  );
};

type ErrorCardProps = {
  msg?: string;
  visible?: boolean;
};

const ErrorCard: React.FC<ErrorCardProps> = ({ msg, visible = true }) => {
  const [dismissed, setDismissed] = useState(false);
  const [animationClass, setAnimationClass] = useState(styles.animateSlideIn);

  useEffect(() => {
    if (visible) {
      // Reset dismissed state and show animation
      setDismissed(false);
      setAnimationClass(styles.animateSlideIn);

      const timeout = setTimeout(() => triggerDismiss(), 2000);
      return () => clearTimeout(timeout);
    }
  }, [visible, msg]); // Re-run if visible or message changes

  const triggerDismiss = () => {
    setAnimationClass(styles.animateFadeOut);
    setTimeout(() => setDismissed(true), 300); // Match fade out time
  };

  if (!visible || dismissed) return null;

  return (
    <div
      className={classNames(
        "flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50",
        styles.errorCard,
        animationClass
      )}
    >
      <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#D10002] px-[10px]">
        <div className="flex gap-2">
          <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <div>
            <p className="text-white" style={{ fontWeight: 600, fontSize: "13.5px" }}>Please try again</p>
            <p className="text-white">{msg}</p>
          </div>
        </div>
        <button onClick={triggerDismiss} className={classNames("text-gray-600 p-1 rounded-md transition-colors ease-linear", styles.closeErrorPopup)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
