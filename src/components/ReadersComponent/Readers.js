import React, { Component } from 'react';
import {Table,
        Button,
        ButtonGroup} from 'reactstrap';
import Axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

// var mock = new MockAdapter(Axios);

export class Readers extends Component {
    displayName = Readers.name;

    constructor(props) {
        super(props);
        this.state = {
          readers: []
        };
    }

    async componentDidMount() {
        // mock.onGet('/api/reader').reply(200, {
        //   readers: [
        //     { address: 'Miła 1, 90-430 Warszawa', email: 'abc@abc.pl', firstName: 'Anna', id: 1, lastName: 'Nowak', phone: 261423998 },
        //     { address: 'Miła 1, 90-430 Warszawa', email: 'abc@abc.pl', firstName: 'Jonna', id: 2, lastName: 'Nowak', phone: 261423998 },
        //     { address: 'Miła 1, 90-430 Warszawa', email: 'abc@abc.pl', firstName: 'Maria', id: 3, lastName: 'Nowak', phone: 261423998 },

        //   ]
        // });
  
        this.setState({
          readers: await Axios.get('http://localhost:8080/api/reader')
          .then(function(response){
              console.log(`Api response:`, response);
              return response.data;
          })
        });
    }

    render() {
        return(
              <Table responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nazwisko</th>
                    <th>Imię</th>
                    <th>Telefon</th>
                    <th>Adres</th>
                    <th>Email</th>
                      <th>Ważność karty</th>
                    <th>wypożyczone pozycje</th>
                    <th>Akcje</th>
                  </tr>
                </thead>

                <tbody>
                {
                  this.state.readers.map( rdr =>
                  <tr key={rdr.id}>
                    <td>{rdr.id}</td>
                    <td>{rdr.lastName}</td>
                    <td>{rdr.firstName}</td>
                    <td>{rdr.phone}</td>
                    <td>{rdr.address}</td>
                    <td>{rdr.email}</td>
                      <td>{rdr.cardExpiryDate.toString().slice(0,10)}</td>
                    <td>{rdr.rentedBooksCount}</td>
                    <td>
                      <ButtonGroup vertical block>
                        <Button color="dark">
                            Edytuj dane
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
