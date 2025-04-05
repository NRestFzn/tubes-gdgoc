import styles from '../styles/Sidepanel.module.css';

import {DashboardIcon, SalesIcon, StockIcon, LogoutIcon} from './SvgIcons.tsx'

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
                <DashboardIcon className={styles.icon} />
                Dashboard
              </button>
          </li>
          <li>
              <button className="sales">
                <SalesIcon className={styles.icon} />
                Destination
              </button>
          </li>
          <li>
              <button className="stock">
                <StockIcon className={styles.icon} />
                Vacation
              </button>
          </li>
          <li>
              <button className="stock">
                <StockIcon className={styles.icon} />
                User
              </button>
          </li>
          <li>
              <button className="stock">
                <StockIcon className={styles.icon} />
                Booking
              </button>
          </li>
          <li>
            <button id="logout">
              <LogoutIcon className={styles.icon} />
              Keluar
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
}