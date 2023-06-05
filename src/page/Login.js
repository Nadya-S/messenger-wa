import useInput from "../hooks/useInput";
import AuthorizationForm from "../components/AuthorizationForm/AuthorizationForm";

const Login = ({ onLogin }) => {
  const idInstance = useInput("");
  const apiTokenInstance = useInput("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(idInstance.value, apiTokenInstance.value);
  };

  return (
    <section className="login">
      <AuthorizationForm
        idInstance={idInstance}
        apiTokenInstance={apiTokenInstance}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default Login;
