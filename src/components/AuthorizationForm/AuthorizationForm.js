import "./AuthorizationForm.css";

const AuthorizationForm = ({ idInstance, apiTokenInstance, handleSubmit }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title"> Авторизация</h2>
      <fieldset className="form__field">
        <p className="form__input-title">idInstance:</p>
        <input
          className="form__input"
          value={"" || idInstance.value}
          onChange={idInstance.onChange}
          required
        ></input>
        <p className="form__input-title">apiTokenInstance:</p>
        <input
          className="form__input"
          value={apiTokenInstance.value}
          onChange={apiTokenInstance.onChange}
          required
        ></input>
      </fieldset>
      <button className="booking-form__button" type="submit">
        Авторизоваться
      </button>
    </form>
  );
};

export default AuthorizationForm;
