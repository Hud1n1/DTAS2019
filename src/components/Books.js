import React, {Component} from 'react';
import {Table,
        Button,
        ButtonGroup} from 'reactstrap';

export class Books extends Component {
    displayName = Books.name;
    render() {
        return (
            <Table>
              <thead>
                <tr>
                  <th>Lp.</th>
                  <th>Tytuł</th>
                  <th>Autor</th>
                  <th>Data wydania</th>
                  <th>Dostępność</th>
                  <th>Akcje</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Podróż ludzi Księgi</td>
                  <td>Tokarczuk Olga</td>
                  <td>1993</td>
                  <td>Tak</td>
                  <td>
                    <ButtonGroup vertical block>
                        <Button color="dark">
                            Wypożycz
                        </Button>
                        <Button color="secondary">
                            Zwróć
                        </Button>
                    </ButtonGroup>

                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Władca Pieścieni: Dwie wieże</td>
                  <td>Tolkien J.R.R.</td>
                  <td>1999</td>
                  <td>Tak</td>
                  <td>
                    <ButtonGroup vertical block>
                        <Button color="dark">
                            Wypożycz
                        </Button>
                        <Button color="secondary">
                            Zwróć
                        </Button>
                    </ButtonGroup>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>To</td>
                  <td>King Stephen</td>
                  <td>2018</td>
                  <td>Nie</td>
                  <td>
                    <ButtonGroup vertical block>
                        <Button color="dark">
                            Wypożycz
                        </Button>
                        <Button color="secondary">
                            Zwróć
                        </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
        );
    }
}