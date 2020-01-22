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
        searchTerm: ''
      };
    }

   

    renderTableContent(status)
    {
      
      return(<tr key={status.id}>
        <td>{status.id}</td>
        <td>{status.title}</td>
        <td>{status.author}</td>
        <td>{status.year}</td>
        <td>{status.category}</td>
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
     nextPage(event) {
      this.state.pageNr = 0;
      event.preventDefault();
      this.state.pageNr = this.state.pageNr++;
      this.doSearch(this.state.searchTerm, this.state.pageNr)
      console.log('next', this.state.pageNr)
    }
     prevPage(event) {
      event.preventDefault();
      if(this.state.pageNr > 0) {
        this.state.pageNr= this.state.pageNr--;
        this.doSearch(this.state.searchTerm, this.state.pageNr)
        console.log('prevvvvvv', this.state.pageNr)
      }
    }

    async doSearch(term, pageNr) {
        //console.log(`Search term: ${term}`);
        this.setState({
          bookStats: await Axios.get(`http://localhost:8080/api/bookstatus/find/${pageNr}?size=5&title=${term}`)
          .then(function(response){
            console.log(`Api response:`,response);
            return response.data;
          })
        });
    
    }
          
    
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
      
      <Table responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tytuł</th>
            <th>Autor</th>
            <th>Data wydania</th>
            <th>Dział</th>
          </tr>
        </thead>
       
        <tbody>
            {this.state.bookStats.map(bookstat=>this.renderTableContent(bookstat))}
        </tbody>
      </Table>

      <Button color= "secondary" type="button" id="back" onClick={this.nextPage}>Dalej </Button> 
      <Button color= "secondary" type="button" id="forward" onClick={this.prevPage}>Wstecz </Button> 
      </div>
    );
  }
}