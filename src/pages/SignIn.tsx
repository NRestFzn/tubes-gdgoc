import styles from '../styles/Login.module.css'

import {LogoutIcon} from '../components/SvgIcons'

const SignInIcon = LogoutIcon

export const SignIn: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.background}>
      <div>
        <div></div>
        <div className={styles.loginBox}>
          <div className={styles.svgContainer}>
            <SignInIcon/>
          </div>

          <p className={styles.title}>Sign in with email</p>
          <p className={styles.description}>Make your dream vacation come true. Start looking for destination now</p>

          <div className={styles.inputContainer}></div>
          <div className={styles.inputContainer}></div>
          <p>Forgot password?</p>

          <button>Get Started</button>
          <p>Or sign in with</p>

          <div className={styles.thirdPartyLogin}></div>
          <div className={styles.thirdPartyLogin}></div>
          <div className={styles.thirdPartyLogin}></div>
        </div>
      </div>
    </div>
  )
}