import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth.jsx";
import Form from "../UI/Form";
import "./Login.scss";

function Login() {
  // Initialisation ----------------------------------------------

  const { login } = useAuth();
  const navigate = useNavigate();

  const staff = {
    UserID: 14,
    UserTitle: "Dr",
    UserFirstname: "James",
    UserLastname: "Denholm-Price",
    UserEmail: "j.denholm-price@kingston.ac.uk",
    UserImageURL:
      "https://www.kingston.ac.uk/sites/default/files/styles/1_1_media_sm/public/migrated-images/kingston-university-de7a753-drjamesdenholm-price.png?h=5f0c8d78&itok=cHklReV8",
    UserUsertypeID: 1,
    UserPositionID: 2,
    UserUsertypeName: "Academic",
    UserPositionName: "Associate Professor",
  };
  // State -------------------------------------------------------
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handlers ----------------------------------------------------
  // View --------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    login(staff);
    navigate("/home");
  };

  return (
    <>
      <h1>Login</h1>
      <div className="formBox">
        <Form onSubmit={handleSubmit} submitButtonText={"Login"}>
          <Form.Item label="Email">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Item>

          <Form.Item label="Password">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Login;
