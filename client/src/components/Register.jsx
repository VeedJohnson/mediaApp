import { useState } from "react";
import axios from "axios";
import { Form, FormControl, FormGroup } from "react-bootstrap";

export default function Register(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  console.log(props);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
      <Form
        className="w-50 card p-5"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();

          axios
            .post("http://localhost:5000/api/user/register", {
              firstname,
              lastname,
              email,
              username,
              password,
            })
            .then(({ data }) => {
              console.log(data);
              if (data?.status === "success") {
                props.history.push("/login");
              }
            })
            .catch(({ response }) => {
              setError({
                data: response?.data?.data,
                status: response?.data?.status,
              });
              console.log(error);
            });
        }}
      >
        <FormGroup className="m-2">
          <FormControl
            type="text"
            value={firstname}
            placeholder="First name"
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="m-2">
          <FormControl
            type="text"
            value={lastname}
            placeholder="Last name"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="m-2">
          <FormControl
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="m-2">
          <FormControl
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="m-2">
          <FormControl
            type="password"
            value={password}
            placeholder="Create Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FormGroup>
        <FormGroup className="m-2">
          <FormControl
            type="submit"
            value="Register"
            className="btn btn-primary"
          />
        </FormGroup>
      </Form>
    </div>
  );
}
