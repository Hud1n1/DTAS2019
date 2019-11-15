import React, { Component } from 'react';
import Axios from 'axios';

export class Rental extends Component {

    state = {
        newStatus: {
            book: {
                id: 0
            },
            reader: {
                id: 0
            },
            rented: false,
            rentedOn: null,
            rentedUntil: null
        }
    };

    bookIdSubmitted = event => {
        this.setState({
            newStatus: {
                book: {
                    id: parseInt(event.target.value)
                }
            }
        })
    };

    readerIdSubmitted = event => {
        this.setState({
            newStatus: {
                reader: {
                    id: parseInt(event.target.value)
                }
            }
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            newStatus: {
                rented: true,
                rentedOn: new Date(),
                rentedUntil: new Date()
            }
        });

        Axios.put('http://127.0.0.1:8080/api/bookstatus',this.state.newStatus)
            .then(res => {
                console.log(`Api response ${res}`)
            })
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Id Książki:
                        <input type={'number'} name={'bookId'} onChange={this.bookIdSubmitted}/>
                    </label>
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
