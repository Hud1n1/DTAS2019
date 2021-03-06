import React, { Component } from 'react';
import Axios from 'axios';
import {Button, ButtonGroup} from 'reactstrap';

export class Rental extends Component {

    newStatus;
    api = 'http://127.0.0.1:8080/api/bookstatus';

    constructor(props) {
        super(props);
        this.newStatus = {
            id: props.status.id,
            rented: props.status.rented || false,
            book: props.status.book || null,
            reader: props.status.reader || null
        };
    };

    readerIdSubmitted = event => {
       this.newStatus.reader = { id: parseInt(event.target.value) }
    };
    bookIdSubmitted = event => {
        this.newStatus.book = { id: parseInt(event.target.value) }
    };

    handleRental = event => {
        event.preventDefault();

        this.newStatus.rented = true;

        console.log('to be Sent: ', this.newStatus);

        Axios.put(this.api, this.newStatus)
            .then(() => window.location.reload())
            .catch(function (error) {
                if (error.response) {
                    window.alert(error.response.data);
                    console.error(error.response);
                }
            });
    };

    handleReturn = event => {
        event.preventDefault();
        this.newStatus.reader = null;
        this.newStatus.rented = false;

        Axios.put(this.api, this.newStatus)
            .then(() => window.location.reload())
            .catch(function (error) {
                if (error.response) {
                    console.error(error.response);
                }
            });
    };
    RentABookForm = () => {
        return <form onSubmit={this.handleRental}>
                    <label>
                        Id Czytelnika:
                        <input type={'number'} name={'readerId'} onChange={this.readerIdSubmitted}/>
                    </label>
                    <Button type={'submit'}>Wypożycz</Button>
                </form>;
    };
    ReturnBookForm = () => {
        return <form onSubmit={this.handleReturn}>
            <ButtonGroup vertical block>
                <Button color={'dark'} type={'submit'}>Zwróć</Button>
            </ButtonGroup>
        </form>
    };

    DisplayForm = (props) => {
        if(props.rented) {
            return <this.ReturnBookForm/>
        }
        return <this.RentABookForm/>
    };

    render() {
        return (
            <div>
                <this.DisplayForm rented={this.props.status.rented}/>
            </div>
        )
    }
}
