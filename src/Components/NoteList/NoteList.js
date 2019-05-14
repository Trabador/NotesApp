import React, { Component } from 'react';
import Note from '../Note/NoteComponent';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';


class NoteList extends Component{
    render(){
        console.log(this.props.data)
        if(this.props.data){
            const aux = this.props.data[this.props.user.uid];
            let notes = []
            if(aux != null){
                notes = Object.keys(this.props.data[this.props.user.uid]).map(key => {
                    return ({ data: this.props.data[this.props.user.uid][key], id: key })
                });
                notes = notes.reverse();
            }
            return(
                <div className='notesBody'>
                    {
                        notes.map(note => {
                            return(
                                <Note 
                                    message={note.data.message} 
                                    id={note.id} 
                                    key={note.id} 
                                />
                            )
                        })
                    }
                </div>
            );
        }
        const style = {
            textAlign: 'center'
        }
        return <h2 style={style}>Loading</h2>;
    }
}

const mapStateToProps = state => {
    return {
        data: state.firebase.data.notes2,
        user: state.firebase.auth,
    }
}


export default compose(
    connect(mapStateToProps,{}),
    firebaseConnect((props) => ([`notes2/${props.user.uid}`] ))
)(NoteList);