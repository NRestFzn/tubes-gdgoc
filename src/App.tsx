import styles from './styles/App.module.css'

import {Dashboard} from './pages/Dashboard.tsx'
import { SignIn } from './pages/SignIn.tsx'

function App() {
  return (
    <div className={styles.root}>
      <SignIn/>
      {/* <Dashboard>
        <div></div>
      </Dashboard> */}
    </div>
  )
}

export default App
