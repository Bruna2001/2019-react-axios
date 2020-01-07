import React, { Component } from "react";
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Input
} from "semantic-ui-react";

import api from "../../infrastructure/api";
import { login } from "../../infrastructure/auth";

class LoginPage extends Component {
  state = { nickname: "", password: "" };

  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleLogin = async event => {
    event.preventDefault();
    const { nickname, password } = this.state;
    if (!nickname || !password) {
      this.setState({ error: "por favor, preencha email e senha!!!" });
    } else {
      try {
        const response = await api.get("/auth", {
          auth: {
            username: nickname,
            password: password
          }
        });
        login(response.data.token);
        if (this.props.onLogin !== undefined) {
          this.props.onLogin(response.data);
          console.log("====================================");
          console.log(response.data);
          console.log("====================================");
        }
      } catch (error) {
        this.setState({ error: "por favor, verifique seu email e senha!!!" });
      }
    }
  };

  render() {
    const { nickname, password } = this.state;

    return (
      <Container fluid>
        <Header>Login</Header>
        <Form onSubmit={this.handleLogin}>
          <Form.Field>
            <Input
              label="Apelido"
              icon="user"
              iconPosition="right"
              placeholder="Apelido"
              name="nickname"
              value={nickname}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              label="Senha"
              icon="lock"
              iconPosition="right"
              type="password"
              placeholder="Senha"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label="Manter conectado" />
          </Form.Field>
          <Button type="submit">Login</Button>
        </Form>
      </Container>
    );
  }
}
export default LoginPage;
