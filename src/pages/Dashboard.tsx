import classNames from "classnames";

import {Sidepanel} from '../components/Sidepanel.tsx';
import styles from '../styles/Dashboard.module.css';

interface DashboardProps {
  children: React.ReactNode
}

export const Dashboard: React.FC<DashboardProps> = ({ children }): React.ReactElement => {
  return (
    <div className={classNames(styles.main, styles.container)}>
      <Sidepanel/>
      <div className={classNames(styles.body, styles.container)}>
        {children}
      </div>
    </div>
  )
}