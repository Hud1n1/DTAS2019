import React, { Component } from 'react';
import Axios from 'axios';

export class Rental extends Component {

    newStatus;
    api = 'http://127.0.0.1:8080/api/bookstatus';

    constructor(props) {
        super(props);
        this.newStatus = {
            id: props.status.id,
            rented: props.status.rented || false,
            rentedOn: props.status.rentedOn || null,
            rentedUntil: props.status.rentedUntil || null,
            book: props.status.book || null,
            reader: props.status.reader || null
        };
    };

    readerIdSubmitted = event => {
       this.newStatus.reader = { id: parseInt(event.target.value) }
    };
    bookIdSubmitted = event => {
        this.newStatus.book = { id: parseInt(event.target.value) }
    }

    handleRental = event => {
        event.preventDefault();

        this.newStatus.rented = true;
        this.newStatus.rentedOn = new Date();
        this.newStatus.rentedUntil = new Date();

        console.log('to be Sent: ', this.newStatus);

        Axios.put(this.api, this.newStatus)
            .then(() => window.location.reload(),
                err => {
                    window.alert("Nieprawidłowe dane");
                    console.error(err)
                }
            );
    };

    handleReturn = event => {
        event.preventDefault();
        this.newStatus.reader = null;
        this.newStatus.rented = false;
        this.newStatus.rentedOn = null;
        this.newStatus.rentedUntil = null;

        Axios.put(this.api, this.newStatus).then(
        () => window.location.reload(),
        err => {
                window.alert("Wystąpił błąd");
                console.error(err)
            }
        );
    };
    RentABookForm = () => {
        return <form onSubmit={this.handleRental}>
                    <label>
                        Id Czytelnika:
                        <input type={'number'} name={'readerId'} onChange={this.readerIdSubmitted}/>
                    </label>
                    <button type={'submit'}>Wypożycz</button>
                </form>;
    };
    ReturnBookForm = () => {
        return <form onSubmit={this.handleReturn}>
            <button type={'submit'}>Zwróć</button>
        </form>
    };

    DisplayForm = (props) => {
        if(props.rented) {
            return <this.ReturnBookForm/>
        }
        return <this.RentABookForm/>
    }

    render() {
        return (
            <div>
                <this.DisplayForm rented={this.props.status.rented}/>
            </div>
        )
    }
}
