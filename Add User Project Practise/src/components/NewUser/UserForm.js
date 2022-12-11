import { useState, useRef } from "react";

import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

import styles from "./UserForm.module.css";
const UserForm = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent page reload
    const enteredUsername = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredUsername.trim().length === 0 || enteredUserAge.trim().length  === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (not-empty values)",
      });
      return;
    }

    if (+enteredUserAge < 1) {  // + will make sure that enteredAge is a number
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (> 0)",
      });
      return;
    }
    const userData = {
      name: enteredUsername,
      age: +enteredUserAge,
    };

    props.onSaveUserData(userData);
    
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <Wrapper>
      {error && (
        <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>
      )}
      <form className={styles["user-form"]} onSubmit={submitHandler}>
        <div className={styles["new-user__controls"]}>
          <div className={styles["new-user__control"]}>
            <label>Username</label>
            <input
              type="text"
              ref={nameInputRef}
            ></input>
          </div>
          <div className={styles["new-user__control"]}>
            <label htmlFor="Age">Age (Years)</label>
            <input
              type="number"
              ref={ageInputRef}
            ></input>
          </div>
        </div>
        <div className={styles["new-user__actions"]}>
          <Button type="submit">Add User</Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UserForm;
