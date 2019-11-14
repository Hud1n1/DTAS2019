import React, {Component} from 'react';
import {Button} from 'reactstrap';

export class HomePage extends Component {
    displayName = HomePage.name;

    constructor(props) {
      super(props);
    }

  render() {
    return(
      <div>
        <br/>
        <Button size="lg" color="dark" block href="/books"> Książki </Button>
        <Button size="lg" outline color="dark" block href="/books-add"> Dodaj książkę </Button>
        <br/>
        <Button size="lg" color="dark" block href="/readers"> Czytelnicy </Button>
      </div>
    );
  }
}