import styles from '@/styles/SignUp.module.css';

import LoadingSpinner from '@/components/ui/LoadingSpinner';

import logo from '@/assets/mochi.jpg';
import viewEye from '@/assets/viewEye.png';
import hideEye from '@/assets/hideEye.png';

import { ThemeSwitch } from '@/components/ui/theme-switch';
import { MenuDropdown } from '@/components/ui/mobile-dropdown';
import { ErrorCard } from '@/components/ui/error-card';

import { useState, useEffect } from 'react';
import { LoginIcon } from '@/components/SvgIcons';
import { useNavigate } from 'react-router-dom';

import { PreloadImageCSS } from '../../helper/preload';
import { loginWithGoogle } from '../../helper/loginWithGoogle';
import { registerWithEmail } from '../../helper/registerWithEmail';

export type AuthErrorType = 'invalid-credentials' | 'generic';

const SignUp: React.FC = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState(styles.animateSlideIn);

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorType, setErrorType] = useState<AuthErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = (): void => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = (): void => setShowConfirmPassword((prev) => !prev);
  const handleThemeToggle = (): void => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const showPopup = () => {
    setIsMounted(true);
    setAnimationClass(styles.animateSlideIn);
    setTimeout(() => setIsVisible(true), 300);
  };

  const hidePopup = () => {
    setIsVisible(false);
    setAnimationClass(styles.animateFadeOut);
    setTimeout(() => setIsMounted(false), 300);
  };

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => hidePopup(), 2000);
    }
  }, [isVisible]);

  const handleSubmit = (e: React.FormEvent) => {
    if (password !== confirmPassword) {
      setErrorType('invalid-credentials');
      showPopup();
      return;
    }

    registerWithEmail(e, navigate, setErrorType, showPopup, email, password, setIsLoading);
  };

  return (
    <div data-theme={theme} className={styles.wrapper}>
      <PreloadImageCSS path={viewEye} />
      <div className={styles.background}>
        <div>
          <header className={styles.header}>
            <div className={styles.logo} onClick={() => navigate('/')} tabIndex={0}>
              <img src={logo} alt="mochi-travel-logo" />
              <p>Mochi Travel</p>
            </div>

            <div className={styles.headerButtons}>
              <button onClick={() => navigate('/sign-in')}>Sign in</button>
              <button>Sign Up</button>
              <ThemeSwitch theme='red-theme' onClick={handleThemeToggle} />
              <MenuDropdown theme='red-theme'/>
            </div>
          </header>

          <main className={styles.mainContainer}>
            <div className={styles.loginBox}>
              <div className={styles.svgContainer}>
                <LoginIcon className={styles.icon} />
              </div>

              <div className={styles.title}>
                <p>Sign up with Email</p>
                <p>Get started managing your travel business now. For free.</p>
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

                <div className={styles.inputContainer}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div
                    className={styles.eyeIcon}
                    onClick={toggleConfirmPassword}
                    tabIndex={0}
                    style={{
                      WebkitMaskImage: `url(${showConfirmPassword ? viewEye : hideEye})`,
                      maskImage: `url(${showConfirmPassword ? viewEye : hideEye})`,
                    }}
                  ></div>
                </div>

                <p>Forgot password?</p>

                <button type="submit">Start working</button>

                <p>Or sign in with</p>
              </form>

              <div className={styles.thirdPartyContainer}>
                <div
                  className={styles.googleLogin}
                  onClick={(e) =>
                    loginWithGoogle(e, navigate, setErrorType, showPopup)
                  }
                ></div>
                <div className={styles.facebookLogin}></div>
                <div className={styles.appleLogin}></div>
              </div>
            </div>

            {isMounted && (
              <ErrorCard
                msg={
                  errorType === 'invalid-credentials'
                    ? 'Invalid credentials or password mismatch'
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

export default SignUp;
