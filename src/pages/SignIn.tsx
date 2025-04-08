import styles from '../styles/SignIn.module.css';
import logo from '../assets/mochi.jpg';
import {useState} from 'react';

import {LoginIcon} from '../components/SvgIcons';

const SignIn: React.FC = (): React.ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (): void => setShowPassword((prev) => !prev);

  return (
    <div className={styles.background}>
      <div>
        <header>
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
            <p>
              Make your dream vacation come true. Start looking for destination
              now
            </p>
          </div>

          <form>
            <div className={styles.inputContainer}>
              <input type="text" placeholder="Email" />
            </div>
            <div className={styles.inputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
              />
              <div className={styles.eyeIcon} onClick={togglePassword}></div>
            </div>
            <p>Forgot password?</p>
            <button>Get Started</button>
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

export default SignIn;
