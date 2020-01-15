import React, {Component} from 'react';
import {
    Button,
    Toast,
    ToastHeader,
    ToastBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import Axios from 'axios';

export class ReadersEdit extends Component {
    displayName = ReadersEdit.name;


    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            id: props.match.params.id,
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            email: '',
            cardExpiryDate: '',
            changed: false
        }
    }

    async componentDidMount() {
        this.getReaderById();
    }

    testNumber(number) {
        var regNum = /^\d{9}$/;
        var result = regNum.test(number);
        return result;
    }

    testMail(mail) {
        var regNum = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var result = regNum.test(mail);
        return result;
    }

    getReaderById = async () => {
        let temp = await Axios.get('http://localhost:8080/api/reader/' + this.state.id);
        this.setState(temp.data);
    }

    handleChange(event) {
        this.setState({changed: true});
    }

    submitForm(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        const newData = {
            id: this.state.id,
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            address: data.get('address'),
            phone: data.get('phone'),
            email: data.get('email'),
            cardExpiryDate: data.get('cardExpiryDate')
        }

        if (this.testMail(newData.email)) {
            if (this.testNumber(newData.phone)) {
                if (this.state.changed) {
                    Axios.put('http://localhost:8080/api/reader/', newData)
                        .then(res => {
                            alert("Dane czytelnika o numerze " + newData.id + " zostały zmienione.");
                        });
                } else {
                    alert("Nie wprowadzono zmian!");
                }
            } else {
                alert("Nieprawidłowy numer telefonu");
            }
        } else {

            alert("Nieprawidłowy email");
        }
    }


    render() {
        return (
            <div className="p-3 my-2 rounded text-centered bg-docs-transparent">
                <Toast>
                    <ToastHeader> Edytuj dane czytelnika </ToastHeader>
                    <ToastBody>
                        <Form onSubmit={this.submitForm} onChange={this.handleChange}>
                            <FormGroup>
                                <Label for="firstName"> Imie </Label>
                                <Input name="firstName" id="firstNameInput" required
                                       defaultValue={this.state.firstName}/>

                                <Label for="lastName"> nazwisko </Label>
                                <Input name="lastName" id="lastNameInput" required
                                       defaultValue={this.state.lastName}/>

                                <Label for="address"> adres </Label>
                                <Input name="address" id="addressInput" required
                                       defaultValue={this.state.address}/>

                                <Label for="phone"> telefon </Label>
                                <Input name="phone" id="phoneInput" required
                                       defaultValue={this.state.phone}/>

                                <Label for="email"> email </Label>
                                <Input name="email" id="emailInput" required
                                       defaultValue={this.state.email}/>

                                <Label for="cardExpiryDate"> data waznosci karty </Label>
                                <Input name="cardExpiryDate" id="cardExpiryDateInput" required
                                       defaultValue={this.state.cardExpiryDate}/>

                                <br/>
                                <Button color="secondary" type="submit"> Zapisz zmiany </Button>
                                &nbsp;
                                <Button outline color="secondary" className="float-right"
                                        href="/readers"> Anuluj </Button>
                            </FormGroup>
                        </Form>
                    </ToastBody>
                </Toast>
            </div>
        );
    }
}