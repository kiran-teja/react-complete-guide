import Card from "./Card";
import Button from "./Button";
import ReactDOM from 'react-dom';

import styles from "./ErrorModal.module.css";
import React from "react";

const Backdrop = props => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />
};

const ModalOverlay = (props) => {
    return (
      <Card className={styles["modal-card"]}>
        <header className={styles["header"]}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles["body"]}>
          <p>{props.message}</p>
        </div>
        <footer className={styles["actions"]}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card>
    );
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm} 
        />,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
