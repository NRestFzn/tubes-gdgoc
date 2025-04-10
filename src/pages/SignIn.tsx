import styles from '../styles/SignIn.module.css';

import logo from '../assets/mochi.jpg';
import viewEye from '../assets/viewEye.png';
import hideEye from '../assets/hideEye.png';

import {useState, useEffect} from 'react';
import {LoginIcon} from '../components/SvgIcons';
import styled from 'styled-components';

import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';

import {FirebaseError} from 'firebase/app';
import {signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import {auth, googleProvider} from '@/firebase';

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
          showPopup();
        } else {
          setErrorType('generic');
          showPopup();
        }
      } else {
        setErrorType('generic');
        showPopup();
      }
    }
  };

  const loginWithGoogle = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      await signInWithPopup(auth, googleProvider);

      setErrorType(null);
      navigate('/admin/destination');
    } catch {
      setErrorType('generic');
      showPopup();
    }
  };

  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState(styles.animateSlideIn);

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
            <ThemeSwitch/>
            <MenuDropdown/>
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
      </div>
    </div>
  );
};

type ErrorCardProps = {
  msg?: string;
  onClose: () => void;
  animation?: string;
};

const ErrorCard: React.FC<ErrorCardProps> = ({msg, onClose, animation}) => {
  return (
    <div
      className={classNames(
        'flex-col gap-2 w-60 sm:w-72 text-[10px] sm:text-xs z-50',
        styles.errorCard,
        animation
      )}
    >
      <div className="error-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#D10002] px-[10px]">
        <div className="flex gap-2">
          <div className="text-[#d65563] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div>
            <p
              className="text-white"
              style={{fontWeight: 600, fontSize: '13.5px'}}
            >
              Please try again
            </p>
            <p className="text-white">{msg}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className={classNames(
            'text-gray-600 p-1 rounded-md transition-colors ease-linear',
            styles.closeErrorPopup
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const ThemeSwitch = () => {
  return (
    <StyledWrapperB>
      <label id="theme-toggle-button">
        <input type="checkbox" id="toggle" />
        <svg viewBox="0 0 69.667 44" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(3.5 3.5)" data-name="Component 15 – 1" id="Component_15_1">
            <g filter="url(#container)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
              <rect
                fill="#96EEE5"
                stroke="#FFFFFF"
                strokeWidth="1"
                transform="translate(3.5 3.5)"
                rx="17.5"
                height={35}
                width="60.667"
                data-name="container"
                id="container"
              />
            </g>
            <g transform="translate(2.333 2.333)" id="button">
              <g data-name="sun" id="sun">
                <g filter="url(#sun-outer)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                  <circle fill="#f8e664" transform="translate(5.83 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="sun-outer" id="sun-outer-2" />
                </g>
                <g filter="url(#sun)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
                  <path fill="rgba(246,254,247,0.29)" transform="translate(9.33 9.33)" d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z" data-name="sun" id="sun-3" />
                </g>
                <circle fill="#fcf4b9" transform="translate(8.167 8.167)" r={7} cy={7} cx={7} id="sun-inner" />
              </g>
              <g data-name="moon" id="moon">
                <g filter="url(#moon)" transform="matrix(1, 0, 0, 1, -31.5, -5.83)">
                  <circle fill="#cce6ee" transform="translate(31.5 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="moon" id="moon-3" />
                </g>
                <g fill="#a6cad0" transform="translate(-24.415 -1.009)" id="patches">
                  <circle transform="translate(43.009 4.496)" r={2} cy={2} cx={2} />
                  <circle transform="translate(39.366 17.952)" r={2} cy={2} cx={2} data-name="patch" />
                  <circle transform="translate(33.016 8.044)" r={1} cy={1} cx={1} data-name="patch" />
                  <circle transform="translate(51.081 18.888)" r={1} cy={1} cx={1} data-name="patch" />
                  <circle transform="translate(33.016 22.503)" r={1} cy={1} cx={1} data-name="patch" />
                  <circle transform="translate(50.081 10.53)" r="1.5" cy="1.5" cx="1.5" data-name="patch" />
                </g>
              </g>
            </g>
            <g filter="url(#cloud)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
              <path fill="#fff" transform="translate(-3466.47 -160.94)" d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z" data-name="cloud" id="cloud" />
            </g>
            <g fill="#def8ff" transform="translate(3.585 1.325)" id="stars">
              <path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z" />
              <path transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z" data-name="star" />
              <path transform="matrix(0.438, 0.899, -0.899, 0.438, 23.177, 29.735)" d="M.015,1.065.475.9l.285.365L.766.772l.46-.164L.745.494.751,0,.481.407,0,.293.285.658Z" data-name="star" />
              <path transform="translate(12.677 0.388) rotate(104)" d="M1.161,1.6,1.059,1,1.574.722.962.607.86,0,.613.572,0,.457.446.881.2,1.454l.516-.274Z" data-name="star" />
              <path transform="matrix(-0.07, 0.998, -0.998, -0.07, 11.066, 15.457)" d="M.873,1.648l.114-.62L1.579.945,1.03.62,1.144,0,.706.464.157.139.438.7,0,1.167l.592-.083Z" data-name="star" />
              <path transform="translate(8.326 28.061) rotate(11)" d="M.593,0,.638.724,0,.982l.7.211.045.724.36-.64.7.211L1.342.935,1.7.294,1.063.552Z" data-name="star" />
              <path transform="translate(5.012 5.962) rotate(172)" d="M.816,0,.5.455,0,.311.323.767l-.312.455.516-.215.323.456L.827.911,1.343.7.839.552Z" data-name="star" />
              <path transform="translate(2.218 14.616) rotate(169)" d="M1.261,0,.774.571.114.3.487.967,0,1.538.728,1.32l.372.662.047-.749.728-.218L1.215.749Z" data-name="star" />
            </g>
          </g>
        </svg>
      </label>
    </StyledWrapperB>
  );
}

const StyledWrapperB = styled.div`
/* The switch - the box around the slider */
#theme-toggle-button {
  font-size: 17px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4em;
  cursor: pointer;

  margin-left : 20px;
}

/* Hide default HTML checkbox */
#toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

#container,
#patches,
#stars,
#button,
#sun,
#moon,
#cloud {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.25s;
}

/* night sky background */
#toggle:checked + svg #container {
  fill: #2b4360;
}

/* move button to right when checked */
#toggle:checked + svg #button {
  transform: translate(28px, 2.333px);
}

/* show/hide sun and moon based on checkbox state */
#sun {
  opacity: 1;
}

#toggle:checked + svg #sun {
  opacity: 0;
}

#moon {
  opacity: 0;
}

#toggle:checked + svg #moon {
  opacity: 1;
}

/* show or hide background items on checkbox state */
#cloud {
  opacity: 1;
}

#toggle:checked + svg #cloud {
  opacity: 0;
}

#stars {
  opacity: 0;
}

#toggle:checked + svg #stars {
  opacity: 1;
}`;

const MenuDropdown = () => {
  const [clicked, setClicked] = useState(false);

  const toggleMenu = () => setClicked(prev => !prev);

  return (
    <StyledWrapper>
      <div className={`nav_bar ${clicked ? "clicked" : ""}`} onClick={toggleMenu}>
        <div className="bar1" />
        <div className="bar2" />
        <div className="bar3_h" />
        <div className="bar4" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .nav_bar {
    background-color: #969FEE;
    position: relative;
    display: none;
    transition: 0.4s;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    margin-left: 10px;
    width: 45px;
    height: 45px;
  }

  @media (max-width: 768px) {
    .nav_bar {
      display: flex;
      margin-left: 20px;
    }
  }

  .bar1,
  .bar2,
  .bar3_h,
  .bar4 {
    border-radius: 30px;
    background-color: #FFFFFF;
    width: 25px;  /* Reduced from 50px */
    height: 3px;  /* Reduced from 5px */
    transition: 0.4s;
  }

  .bar1 {
    margin-bottom: 6px; /* Adjusted spacing */
  }

  .bar4 {
    margin-top: 6px;
  }

  .bar2 {
    position: absolute;
  }

  /* When clicked */
  .nav_bar.clicked {
    border-radius: 50px;
  }

  .nav_bar.clicked .bar3_h {
    transform: rotate(-45deg);
  }

  .nav_bar.clicked .bar2 {
    transform: rotate(45deg);
  }

  .nav_bar.clicked .bar1,
  .nav_bar.clicked .bar4 {
    opacity: 0;
    width: 15px; /* Smaller for collapse animation */
  }
`;

export default SignIn;
