import "./App.css";
import styles from "./App.module.css";
import { Game } from "./components/Game/Game";

function App() {
  return (
    <div className={styles.appRoot}>
      <Game />
    </div>
  );
}

export default App;
