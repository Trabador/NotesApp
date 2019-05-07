import React, { Component } from 'react';
import Note from '../Note/NoteComponent';
import { connect } from 'react-redux';

class NoteList extends Component{
    render(){
        return(
            <div className='notesBody'>
                {
                    this.props.noteList.map(note => {
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
}

const mapStateToProps = state => ({
    noteList: state.notes.noteList,
});

export default connect(mapStateToProps,{})(NoteList);