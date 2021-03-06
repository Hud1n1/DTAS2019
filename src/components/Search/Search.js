import React, {Component} from 'react';
import {Button,
        Toast,
        ToastHeader,
        ToastBody,
        Form,
        FormGroup,
        Label,
        Input,
        Table} from 'reactstrap';
import Axios from 'axios';
import {Rental} from "../RentalComponent/Rental";



export class Search extends Component {
    displayName = Search.name;


    constructor(props) {
      super(props);
      this.submitForm = this.submitForm.bind(this);
      this.state = {
        bookStats: [],
        pageNr: 0,
        searchTerm: '',
          foundCount: 0
      };
    }

    renderTableContent(status)
    {
        console.log(status);
      return(<tr key={status.book.id}>
        <td>{status.book.id}</td>
        <td>{status.book.title}</td>
        <td>{status.book.author}</td>
        <td>{status.book.year}</td>
        <td>{status.book.category}</td>
          <td>{status.rented ? `Wypożyczna do ${status.rentedUntil.toString().slice(0,10)}` : 'Tak'}</td>
          <td>
              <Rental status={status}/>
          </td>
      </tr>)
    }

     submitForm(event)
    { 
        this.state.pageNr = 0;
        event.preventDefault();
        this.state.searchTerm = new FormData(event.target).get('search');
        this.doSearch(this.state.searchTerm, this.state.pageNr);
        console.log('submit', this.state.pageNr)
    }
     nextPage = event => {
        this.doSearch(this.state.searchTerm, this.state.pageNr + 1);
        this.state.pageNr = this.state.pageNr + 1;
        console.log('next', this.state.pageNr)
    };
     prevPage = event => {
      event.preventDefault();
      if(this.state.pageNr > 0) {
          this.doSearch(this.state.searchTerm, this.state.pageNr - 1);
          this.state.pageNr = this.state.pageNr - 1;
          console.log('prevvvvvv', this.state.pageNr)
      }
    };

    async doSearch(term, pageNr) {
        //console.log(`Search term: ${term}`);

        console.log(term,pageNr);

        this.setState({
              bookStats: await Axios.get(`http://localhost:8080/api/bookstatus/find/${pageNr}?size=2&title=${term}`)
              .then(function(response){
                console.log(`Api response:`,response);
                if (response.data.length === 0) {
                    window.alert('Brak wyników. Naciśnij "Wstecz" by wrócić.');
                }
                return response.data;
              }),
            foundCount: await Axios.get(`http://localhost:8080/api/bookstatus/count?title=${term}`)
                .then(function (response) {
                    console.log('bookcount:',response);
                    return response.data;
                })
        });

    }

    BookCount = (props) => {
        if(props.count) {
            return <div>Znalezionych pozycji: {props.count}</div>
        }
        return <div/>
    };


  render() {
    
    return(
      <div className="p-3 my-2 rounded">
        <Toast>
          <ToastHeader> Wyszukaj </ToastHeader>
          <ToastBody>
            <Form onSubmit={this.submitForm}>
              <FormGroup>
                <Label for="search"> Co chcesz znleźć? </Label>
                <Input name="search" pattern="[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9\s]+" id="searchInput" required />
                <br/>
                <Button color="secondary" type="submit" > Szykaj </Button>
              </FormGroup>
            </Form>
          </ToastBody>
        </Toast>

      <this.BookCount count={this.state.foundCount}/>

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
            {this.state.bookStats.map(bookstat=>this.renderTableContent(bookstat))}
        </tbody>
      </Table>


          <Button color= "secondary" type="button" id="forward" onClick={this.prevPage}>Wstecz </Button>
          <Button color= "secondary" type="button" id="back" onClick={this.nextPage}>Dalej </Button>
      </div>
    );
  }
}
