// src/components/ui/LoadingSpinner.tsx
import styles from '../../styles/LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
