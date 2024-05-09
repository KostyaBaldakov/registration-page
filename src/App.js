import styles from "./App.module.css";
import { useEffect, useRef, useState } from "react";
import { Field } from "./components/field";
import { emailValidator } from "./validators";
import { passwordMinValidator } from "./validators";
import { passwordSymbolsValidator } from "./validators";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState(false);

  const submitButtonRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
  };

  const isFormValid = isEmailValid && isPasswordValid && isRepeatPasswordValid;

  useEffect(() => {
    if (isFormValid) {
      submitButtonRef.current.focus();
    }
  }, [isFormValid]);

  return (
    <div className={styles.app}>
      <form onSubmit={onSubmit}>
        <Field
          type="text"
          name="email"
          placeholder="Почта..."
          value={email}
          setValue={setEmail}
          setIsValid={setIsEmailValid}
          validators={[emailValidator]}
        />
        <Field
          type="password"
          name="password"
          placeholder="Пароль..."
          value={password}
          setValue={setPassword}
          setIsValid={setIsPasswordValid}
          validators={[passwordMinValidator, passwordSymbolsValidator]}
        />
        <Field
          type="password"
          name="repeatPassword"
          placeholder="Повтор пароля..."
          value={repeatPassword}
          setValue={setRepeatPassword}
          setIsValid={setIsRepeatPasswordValid}
          validators={[
            (value) => (value === password ? null : "Пароли не совпадают"),
          ]}
          dependencies={{ password }}
          forceValidation={(value) => value.length > 0}
        />
        <button type="submit" disabled={!isFormValid} ref={submitButtonRef}>
          Зарегестрироваться
        </button>
      </form>
    </div>
  );
}

export default App;
