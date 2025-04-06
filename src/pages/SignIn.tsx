import styles from '../styles/SignIn.module.css'

import {LogoutIcon} from '../components/SvgIcons'

const SignInIcon = LogoutIcon

export const SignIn: React.FC = (): React.ReactElement => {
  return (
    <div className={styles.background}>
      <div>
        <header>
          <div className={styles.logo}>
            {/*Logo Icon here*/}
            <p>Mochi Travel</p>
          </div>

          <div className={styles.headerButtons}>
            <button>Sign in</button>
            <button>Sign Up</button>
          </div>
        </header>

        <div className={styles.loginBox}>
          <div className={styles.svgContainer}>
            <SignInIcon className={styles.icon}/>
          </div>

          <p className={styles.title}>Sign in with email</p>
          <p className={styles.description}>Make your dream vacation come true. Start looking for destination now</p>

          <div className={styles.formSection}>
            <form>
              <div className={styles.inputContainer}></div>
              <div className={styles.inputContainer}></div>
            </form>
            <p>Forgot password?</p>

            <button>Get Started</button>
            <p>Or sign in with</p>
          </div>

          <div className={styles.thirdPartyLogin}></div>
          <div className={styles.thirdPartyLogin}></div>
          <div className={styles.thirdPartyLogin}></div>
        </div>
      </div>
    </div>
  )
}