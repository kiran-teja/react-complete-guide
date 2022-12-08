import { useState } from "react";

import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

import styles from "./UserForm.module.css";
const UserForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault(); // Prevent page reload

    if (enteredName.trim().length === 0 || enteredAge.trim().length  === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (not-empty values)",
      });
      return;
    }

    if (+enteredAge < 1) {  // + will make sure that enteredAge is a number
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (> 0)",
      });
      return;
    }
    const userData = {
      name: enteredName,
      age: +enteredAge,
    };

    props.onSaveUserData(userData);
    setEnteredName("");
    setEnteredAge("");
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
              value={enteredName}
              onChange={nameChangeHandler}
            ></input>
          </div>
          <div className={styles["new-user__control"]}>
            <label>Age (Years)</label>
            <input
              type="number"
              value={enteredAge}
              //   min="1"
              //   max="130"
              onChange={ageChangeHandler}
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