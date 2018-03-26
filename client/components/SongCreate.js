import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ''
        }
    }
    onSubmit(e) {
        e.preventDefault();

        this.props.mutate({
            variables: {
                title: this.state.title
            },
            refetchQueries: [{ query }]
        }).then(() => hashHistory.push('/'))
          .catch(err => console.log(err));

    }

    render() {
        return (
            <div>
                <Link to="/">Back</Link>
                <h3>Create A New Song</h3>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <label>Song Tilte</label>
                    <input 
                    onChange={event => this.setState({ title: event.target.value })}
                    value={this.state.title}
                    />
                </form>
            </div>
        );
    }
};

const mutation = gql`
        mutation AddSong($title: String){
            addSong(title: $title) {
                id
                title
            }
        }
`;

export default graphql(mutation)(SongCreate);