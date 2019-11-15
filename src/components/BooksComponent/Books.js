import React, {Component} from 'react';
import {Table,
        Button,
        ButtonGroup} from 'reactstrap';
import Axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

// var mock = new MockAdapter(Axios);

export class Books extends Component {
    displayName = Books.name;

    constructor(props) {
      super(props);
      this.state = {
        books: []
      };
    }

    async componentDidMount() {
      // mock.onGet('/api/book').reply(200, {
      //   books: [
      //     { author: 'John Smith', category: 'Cat', id: 1, title: 'tytuł', year: 1998 },
      //     { author: 'John Smith', category: 'Cat', id: 2, title: 'tytuł2', year: 1998 }
      //  
      //   ]
      // });

      this.setState({
        books: await Axios.get('http://localhost:8080/api/book')
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
                  this.state.books.map( book =>
                  <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                    <td>{book.category}</td>
                    <td>tak</td>
                    <td>
                      <ButtonGroup vertical block>
                        <Button href='/rental' color="dark">
                            Wypożycz
                        </Button>
                        <Button href='/return' color="secondary">
                            Zwróć
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
        )
      }
}
