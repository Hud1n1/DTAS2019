import React, {Component} from 'react';
import {Button,
        Toast,
        ToastHeader,
        ToastBody,
        Form,
        FormGroup,
        Label,
        Input} from 'reactstrap';
import Axios from 'axios';

export class BooksEdit extends Component {
    displayName = BooksEdit.name;


    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.submitForm = this.submitForm.bind(this);
      this.state = {
        id: props.match.params.id,
        title: '',
        author: '',
        year: '',
        category: '',
        changed: false
      }
    }

    async componentDidMount() {
      this.getBookById();
    }

    getBookById = async () => {
      let temp = await Axios.get('http://localhost:8080/api/book/'+this.state.id);
      this.setState(temp.data);
    }

    handleChange(event) {
      this.setState({changed: true});
    }

    testYear(year) {
      var regYear = /^(18|19|20)\d\d$/;
      var result = regYear.test(year);
      return result;
    }

    submitForm(event) {
      event.preventDefault();
      
      const data = new FormData(event.target);
      const newData = {
        id: this.state.id,
        title: data.get('title'),
        author: data.get('author'),
        year: Number(data.get('year')),
        category: data.get('category')
      }

      if (this.testYear(newData.year)) {
        if (this.state.changed) {
          Axios.put('http://localhost:8080/api/book/', newData)
            .then(res => {
              this.props.history.push('/books-edit-list');
              alert("Pozycja numer "+newData.id+" została zmieniona.");
          });
        } else {alert("Nie wprowadzono zmian!");}
      } else {alert("Nieprawidłowy rok wydania!");}
    }

    render() {
      return(
        <div className="p-3 my-2 rounded text-centered bg-docs-transparent">
          <Toast>
            <ToastHeader> Edytuj książkę </ToastHeader>
            <ToastBody>
              <Form onSubmit={this.submitForm} onChange={this.handleChange}>
                <FormGroup>
                  <Label for="title"> Tytuł </Label>
                  <Input name="title" id="titleInput" required
                    defaultValue={this.state.title}/>

                  <Label for="author"> Autor </Label>
                  <Input name="author" id="authorInput" required
                    defaultValue={this.state.author}/>

                  <Label for="year"> Rok wydania </Label>
                  <Input name="year" id="yearInput" required 
                    defaultValue={this.state.year}/>

                  <Label for="category"> Dział </Label> 
                  <Input name="category" type="select" id="categoryInput" required >
                    <option> {this.state.category} </option>
                    <option> Biografia </option>
                    <option> Horror </option>
                    <option> Kryminał </option> 
                    <option> Literatura faktu </option>
                    <option> Literatura podróżnicza </option>
                    <option> Fantastyka </option>
                    <option> Poezja </option>
                  </Input>
                  <br/>
                  <Button color="secondary" type="submit"> Zapisz zmiany </Button>
                  &nbsp;
                  <Button outline color="secondary" className="float-right" href="/books-edit-list"> Anuluj </Button>
                </FormGroup>
              </Form>
            </ToastBody>
          </Toast>

        </div>
      );
    }
}