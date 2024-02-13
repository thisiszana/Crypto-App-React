import styles from "./Layouts.module.css";

function Layouts({ children }) {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>React.js Course</p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Developed by Zana with <span>❤</span></p>
      </footer>
    </>
  );
}

export default Layouts;
