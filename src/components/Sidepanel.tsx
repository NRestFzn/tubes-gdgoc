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