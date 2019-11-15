import React, {Component} from 'react';
import {Table} from 'reactstrap';
import Axios from 'axios';
import {Rental} from "../RentalComponent/Rental";

export class Books extends Component {
    displayName = Books.name;

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
                    <td>{status.rented ? 'Nie' : 'Tak'}</td>
                    <td>
                        <Rental status={status}></Rental>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
        )
      }
}
