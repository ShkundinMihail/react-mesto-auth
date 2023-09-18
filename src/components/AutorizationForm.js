import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export const AutorizationForm = ({ handleSubmitForm }) => {
  const email = useRef("");
  const password = useRef("");
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitForm({
      email: email.current.value,
      password: password.current.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-authorizations">
      <input
        name="email"
        type="email"
        className="form-authorizations__input form-authorizations__input_margin-bottom"
        placeholder="Email"
        required
        ref={email}
      />
      <input
        name="password"
        type="password"
        className="form-authorizations__input"
        placeholder="Пароль"
        required
        ref={password}
      />
      <button
        className="form-authorizations__submit form-authorizations__submit_margin-bottom"
        type="submit"
      >
        {location.pathname === "/sign-up" ? "Регистрация" : "Вход"}
      </button>
      {location.pathname === "/sign-up" && (
        <Link to="/sign-in" className="form-autorizations__enter">
          Уже зарегистрированы? Войти.
        </Link>
      )}
    </form>
  );
};
