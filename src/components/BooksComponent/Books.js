import React, {Component} from 'react';
import {Table,
        Button,
        ButtonGroup} from 'reactstrap';
import Axios from 'axios';
import {Rental} from "../RentalComponent/Rental";
// import MockAdapter from 'axios-mock-adapter';

// var mock = new MockAdapter(Axios);

export class Books extends Component {
    displayName = Books.name;

    constructor(props) {
      super(props);
      this.state = {
        bookStats: []
      };
    }

    async componentDidMount() {
      // mock.onGet('/api/book').reply(200, {
      //   bookStats: [
      //     { author: 'John Smith', category: 'Cat', id: 1, title: 'tytuł', year: 1998 },
      //     { author: 'John Smith', category: 'Cat', id: 2, title: 'tytuł2', year: 1998 }
      //  
      //   ]
      // });

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
                        {/* wyświetl wypożycz/zwróć zal. od statusu */}
                        <Rental></Rental> {/*przekazać: status + książka*/}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
        )
      }
}
