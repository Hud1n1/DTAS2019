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

export class BooksAdd extends Component {
    displayName = BooksAdd.name;


    constructor(props) {
      super(props);
      this.submitForm = this.submitForm.bind(this);
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
        title: data.get('title'),
        author: data.get('author'),
        year: Number(data.get('year')),
        category: data.get('category')
      }

      if (this.testYear(newData.year)) {
        Axios.post('http://localhost:8080/api/book', newData)
        .then(res => {
          console.log(res);
          Axios.post('http://localhost:8080/api/bookstatus', {book: {id: res.data.id}, rented: false})
            .then(res2 => {
            this.props.history.push('/books');
            alert("Pozycja numer "+res.data.id+" została dodana.");
          })}
        );
      } else {alert("Nieprawidłowy rok wydania!");}
    }

    render() {
      return(
        <div className="p-3 my-2 rounded">
          <Toast>
            <ToastHeader> Dodaj książkę </ToastHeader>
            <ToastBody>
              <Form onSubmit={this.submitForm}>
                <FormGroup>
                  <Label for="title"> Tytuł </Label>
                  <Input name="title" id="titleInput" required />

                  <Label for="author"> Autor </Label>
                  <Input name="author" id="authorInput" required />

                  <Label for="year"> Rok wydania </Label>
                  <Input name="year" id="yearInput" required />

                  <Label for="category"> Dział </Label> 
                  <Input name="category" type="select" id="categoryInput" required >
                    <option> </option>
                    <option> Biografia </option>
                    <option> Horror </option>
                    <option> Kryminał </option> 
                    <option> Literatura faktu </option>
                    <option> Literatura podróżnicza </option>
                    <option> Fantastyka </option>
                      <option> Poezja </option>
                      <option> Powieść historyczna </option>
                  </Input>
                  <br/>
                  <Button color="secondary" type="submit"> Dodaj </Button>
                </FormGroup>
              </Form>
            </ToastBody>
          </Toast>

        </div>
      );
    }
}
