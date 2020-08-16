import React, { Component } from "react";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

class App extends Component {
  state = {
    values: [],
  };
  public componentDidMount() {
    axios.get("http://localhost:5000/api/values").then((response) => {
      this.setState({
        values: response.data,
      });
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="plug" />
          <Header.Content>Reactivites</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => {
            return (
              <>
                <List.Item key={value.id}>{value.name}</List.Item>
              </>
            );
          })}
        </List>
      </div>
    );
  }
}

export default App;
