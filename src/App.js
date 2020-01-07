import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import { isAuthenticated } from "./infrastructure/auth";

import { LoginPage, TaskPage } from "./components";

class App extends Component {
  state = { user: undefined };

  update = user => {
    this.setState({ user: user });
  };

  render = () => {
    return (
      <Container style={{ margin: 20 }}>
        {!isAuthenticated() && <LoginPage onLogin={this.update} />}
        {isAuthenticated() && <TaskPage />}
      </Container>
    );
  };
}

export default App;
