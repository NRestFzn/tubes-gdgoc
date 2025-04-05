import styles from '../styles/Sidepanel.module.css';

export const Sidepanel: React.FC = (): React.ReactElement => {
  return (
    <aside>
      <div className={styles.title}>
        <img src="logo.svg" alt="logo" />
        <p>Vacaloka</p>
      </div>

      <div className={styles.card}>
        <ul>
          <li>
              <button className="dashboard">
                <DashboardIcon />
                Dashboard
              </button>
          </li>
          <li>
              <button className="sales">
                <SalesIcon />
                Destination
              </button>
          </li>
          <li>
              <button className="stock">
                <StockIcon />
                Vacation
              </button>
          </li>
          <li>
              <button className="stock">
                <StockIcon />
                User
              </button>
          </li>
          <li>
              <button className="stock">
                <StockIcon />
                Booking
              </button>
          </li>
          <li>
            <button id="logout">
              <LogoutIcon />
              Keluar
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

const DashboardIcon: React.FC = () => (
  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M14,10V22H4a2,2,0,0,1-2-2V10Z" stroke="#000" strokeWidth="2" />
    <path d="M22,10V20a2,2,0,0,1-2,2H16V10Z" stroke="#000" strokeWidth="2" />
    <path d="M22,4V8H2V4A2,2,0,0,1,4,2H20A2,2,0,0,1,22,4Z" stroke="#000" strokeWidth="2" />
  </svg>
);

const SalesIcon: React.FC = () => (
  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="#000" strokeWidth="2" fill="none" />
    <path d="M12 6V18" stroke="#000" strokeWidth="2" />
    <path d="M15 8c-1-2-6-2-6 1s5 2 5 5-5 3-5 0" stroke="#000" strokeWidth="2" fill="none" />
  </svg>
);

const StockIcon: React.FC = () => (
  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M3 11L12 3L21 11" stroke="black" strokeWidth="2" fill="none" />
    <rect x="6" y="11" width="12" height="10" stroke="black" strokeWidth="2" fill="none" />
    <rect x="10" y="15" width="4" height="6" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);

const LogoutIcon: React.FC = () => (
  <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M14 3H6C5.47 3 5 3.47 5 4V20C5 20.53 5.47 21 6 21H14" stroke="black" strokeWidth="2" fill="none" />
    <path d="M17 16L21 12L17 8" stroke="black" strokeWidth="2" fill="none" />
    <path d="M9 12H21" stroke="black" strokeWidth="2" fill="none" />
  </svg>
);