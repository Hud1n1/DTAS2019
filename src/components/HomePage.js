import React, {Component} from 'react';
import {Button} from 'reactstrap';

export class HomePage extends Component {
    displayName = HomePage.name;

  render() {
    return(
      <div>
        <br/>
        <Button size="lg" color="dark" block href="/books"> Książki </Button>
        <Button size="lg" outline color="dark" block href="/books-add"> Dodaj książkę </Button>
        <Button size="lg" outline color="dark" block href="/books-edit-list"> Edytuj książki </Button>
        <br/>
        <Button size="lg" color="dark" block href="/readers"> Czytelnicy </Button>
      </div>
    );
  }
}