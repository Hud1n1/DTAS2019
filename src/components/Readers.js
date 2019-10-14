import React, { Component } from 'react';
import {Table,
        Button,
        ButtonGroup} from 'reactstrap';

export class Readers extends Component {
    displayName = Readers.name;
    render() {
        return (
            <Table>
              <thead>
                <tr>
                  <th>Lp.</th>
                  <th>Nazwisko</th>
                  <th>Imię</th>
                  <th>Telefon</th>
                  <th>Adres</th>
                  <th>wypożyczone pozycje</th>
                  <th>Akcje</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Nowak</td>
                  <td>Jan</td>
                  <td>493843193</td>
                  <td>Mickiewicza 6B/5, 60-243 Poznań</td>
                  <td>2</td>
                  <td>
                    <ButtonGroup vertical block>
                        <Button color="dark">
                            Edytuj dane
                        </Button>
                        <Button color="secondary">
                            Wypożycz książkę
                        </Button>
                        <Button color="secondary">
                            Zwróć książkę
                        </Button>
                    </ButtonGroup>

                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Nowakowska</td>
                  <td>Anna</td>
                  <td>174839236</td>
                  <td>Wioślarska 1,
                      60-342 Poznań</td>
                  <td>0</td>
                  <td>
                    <ButtonGroup vertical block>
                        <Button color="dark">
                            Edytuj dane
                        </Button>
                        <Button color="secondary">
                            Wypożycz książkę
                        </Button>
                        <Button color="secondary">
                            Zwróć książkę
                        </Button>
                    </ButtonGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Stępień</td>
                  <td>Małgorzata</td>
                  <td>382917435</td>
                  <td>Zakopiańska 83, 62-653 Kiekrz</td>
                  <td>3</td>
                  <td>
                    <ButtonGroup vertical block>
                        <Button color="dark">
                            Edytuj dane
                        </Button>
                        <Button color="secondary">
                            Wypożycz książkę
                        </Button>
                        <Button color="secondary">
                            Zwróć książkę
                        </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
        );
    }
}