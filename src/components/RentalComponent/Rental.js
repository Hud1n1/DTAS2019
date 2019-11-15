import React, { Component } from 'react';
import Axios from 'axios';

export class Rental extends Component {

    newStatus;

    constructor(props) {
        super(props);
        this.newStatus = {
            id: props.status.id,
            rented: props.status.rented || false,
            rentedOn: props.status.rentedOn || null,
            rentedUntil: props.status.rentedUntil || null,
            book: props.status.book || null,
            reader: props.status.reader || null
        }
    };

    readerIdSubmitted = event => {
       this.newStatus.reader = { id: parseInt(event.target.value) }
    };
    bookIdSubmitted = event => {
        this.newStatus.book = { id: parseInt(event.target.value) }
    }

    handleSubmit = event => {
        event.preventDefault();

        this.newStatus.rented = true;
        this.newStatus.rentedOn = new Date();
        this.newStatus.rentedUntil = new Date();

        console.log('to be Sent: ', this.newStatus);

        Axios.put('http://127.0.0.1:8080/api/bookstatus',this.newStatus)
            .then(res => {
                console.log(`Api response ${res}`)
            })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Id Czytelnika:
                        <input type={'number'} name={'readerId'} onChange={this.readerIdSubmitted}/>
                    </label>
                    <button type={'submit'}>Wypożycz</button>
                </form>
            </div>
        )
    }
}
