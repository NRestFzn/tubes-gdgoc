import styles from '@/styles/SignIn.module.css';

import LoadingSpinner from '@/components/ui/LoadingSpinner';

import logo from '@/assets/mochi.jpg';
import viewEye from '@/assets/viewEye.png';
import hideEye from '@/assets/hideEye.png';

import { ThemeSwitch } from '@/components/ui/theme-switch';
import { MenuDropdown } from '@/components/ui/mobile-dropdown';
import { ErrorCard } from '@/components/ui/error-card';

import {useState, useEffect} from 'react';
import {LoginIcon} from '@/components/SvgIcons';
import {useNavigate} from 'react-router-dom';

import { PreloadImage } from '../../helper/preload';
import { loginWithEmail } from '../../helper/loginWithEmail';
import { loginWithGoogle } from '../../helper/loginWithGoogle';

export type AuthErrorType = 'invalid-credentials' | 'generic';

const SignIn: React.FC = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorType, setErrorType] = useState<AuthErrorType | null>(null);

  const togglePassword = (): void => setShowPassword((prev) => !prev);

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState(styles.animateSlideIn);
  const [isLoading, setIsLoading] = useState(false);

  const showPopup = () => {
    setIsMounted(true);
    setAnimationClass(styles.animateSlideIn);
    setTimeout(() => setIsVisible(true), 300);
  };

  const hidePopup = () => {
    setIsVisible(false);
    setAnimationClass(styles.animateFadeOut);
    setTimeout(() => setIsMounted(false), 300); // triggers unmount after fade-out
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => hidePopup(), 2000);
    }
  }, [isVisible]);

  type ThemeType = 'light' | 'dark';
  const [theme, setTheme] = useState<ThemeType>('light')

  const handleThemeToggle = (): void => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div data-theme={theme} className={styles.wrapper}>
      <PreloadImage path={viewEye}/>
      <div className={styles.background}>
        <div>
          <header className={styles.header}>
            <div className={styles.logo}>
              <img src={logo} alt="mochi-travel-logo" />
              <p>Mochi Travel</p>
            </div>

            <div className={styles.headerButtons}>
              <button>Sign In</button>
              <button onClick={() => navigate('/sign-up')}>Sign Up</button>
              <ThemeSwitch onClick={handleThemeToggle} />
              <MenuDropdown />
            </div>
          </header>

          <main className={styles.mainContainer}>
            <div className={styles.loginBox}>
              <div className={styles.svgContainer}>
                <LoginIcon className={styles.icon} />
              </div>

              <div className={styles.title}>
                <p>Sign in with email</p>
                <p>Your travel management companion, all in one place.</p>
              </div>

              <form onSubmit={(e) => loginWithEmail(e, navigate, setErrorType, showPopup, setIsLoading, email, password )} className={styles.form}>
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

                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Start working'}
                </button>

                <p>Or sign in with</p>
              </form>

              <div className={styles.thirdPartyContainer}>
                <div className={styles.googleLogin} onClick={(e) => loginWithGoogle(e, navigate, setErrorType, showPopup)}></div>
                <div className={styles.facebookLogin}></div>
                <div className={styles.appleLogin}></div>
              </div>
            </div>

            {isMounted && (
              <ErrorCard
                msg={
                  errorType === 'invalid-credentials'
                    ? 'Invalid credentials'
                    : 'Unknown error'
                }
                onClose={hidePopup}
                animation={animationClass}
              />
            )}

            {isLoading && <LoadingSpinner />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
