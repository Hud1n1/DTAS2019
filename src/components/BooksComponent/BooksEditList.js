import React, {Component} from 'react';
import confirm from "reactstrap-confirm";
import {Table, Button, ButtonGroup} from 'reactstrap';
import Axios from 'axios';

export class BooksEditList extends Component {
    displayName = BooksEditList.name;

    constructor(props) {
      super(props);
      this.state = {
        bookStats: []
      };
    }

    async componentDidMount() {
        this.setState({
          bookStats: await Axios.get('http://localhost:8080/api/bookstatus')
          .then(function(response){
            console.log(`Api response:`,response);
            return response.data;
          })
        });
      }

      async removeConfirm(id, title) {
        let result = await confirm({
            title: "Potwierdź usunięcie książki:",
            message: (<>
                id: <strong>{id}</strong> <br/>
                tytuł: <strong> {title}</strong>
            </>),
            confirmText: "Usuń",
            cancelText: "Anuluj",
            confirmColor: "secondary",
        });
        if (result) {
            console.log(id);
            this.remove(id);
        }
      }

      remove = (id) => {
        console.log(typeof id);
        Axios.delete('http://localhost:8080/api/book/'+id)
        .then(function(response){
          alert("Pozycja numer "+id+" została usunięta.");
          window.location.reload();
        })
      }

    render() {
      return (
        <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tytuł</th>
            <th>Autor</th>
            <th>Data wydania</th>
            <th>Dział</th>
            <th>Dostępność</th>
            <th>Akcje</th>
          </tr>
        </thead>

        <tbody>
          {
            this.state.bookStats.map(status =>
            <tr key={status.book.id}>
              <td>{status.book.id}</td>
              <td>{status.book.title}</td>
              <td>{status.book.author}</td>
              <td>{status.book.year}</td>
              <td>{status.book.category}</td>
              <td>{status.rented ? `Wypożyczna do ${status.rentedUntil.toString().slice(0,10)}` : 'Tak'}</td>
              <td>
                <ButtonGroup vertical>
                  <Button href={"/books-edit/"+status.book.id} disabled={status.rented}> Edytuj </Button>
                  {/* <Button onClick={() => this.remove(status.book.id)} disabled={status.rented}> Usuń </Button> */}
                  <Button onClick={() => this.removeConfirm(status.book.id, status.book.title)} disabled={status.rented}> Usuń </Button>
                </ButtonGroup>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      );
    }
}