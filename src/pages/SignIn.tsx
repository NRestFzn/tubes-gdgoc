import styles from '../styles/Login.module.css'

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

const SignInIcon: React.FC = (): React.ReactElement => (
  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M14 3H6C5.47 3 5 3.47 5 4V20C5 20.53 5.47 21 6 21H14" stroke="black" strokeWidth="2" fill="none" />
    <path d="M17 16L21 12L17 8" stroke="black" strokeWidth="2" fill="none" />
    <path d="M9 12H21" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);