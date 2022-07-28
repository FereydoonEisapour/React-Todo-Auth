import { useState } from 'react';
import { useSelector } from 'react-redux';
import db from '../../../data/firebase';
import { Button, Form, Modal, ListGroup, } from 'react-bootstrap';
import { selectUserEmail } from '../../../features/userSlics';

function DoneTodo({ textTodo, done, id }) {
    const [editModal, setEditModal] = useState(false);
    const [show, setShow] = useState(false);
    const [editText, setEditText] = useState('');
    const userEmail = useSelector(selectUserEmail);
    let toggleDone = () => {
        db.collection(userEmail).doc(userEmail).collection('todos').doc(id).set({
            done: !done
        }, { merge: true })
    }
    const delTodo = () => {
        db.collection(userEmail).doc(userEmail).collection('todos').doc(id).delete()
    }
    const editTodo = () => {
        setEditModal(true);
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
        setEditModal(false);
    };
    const inputHandler = (e) => {
        setEditText(e.target.value);
    }
    const updateTodo = () => {
        db.collection(userEmail).doc(userEmail).collection('todos').doc(id).update({
            todo: editText
        }, { merge: true })
        setShow(false);
        setEditModal(false);
    };
    return (
        <>
            {!editModal ?
                <ListGroup.Item className="w-100 d-flex justify-content-between" id={id} >
                    <div className='col-9'> {textTodo}</div>
                    <div className='col-3 d-flex justify-content-around' >
                        <button className="btn  p-0 " onClick={toggleDone}>
                            <span className="material-icons border-0" style={{ color: '#365e70' }}>undo</span>
                        </button>
                        <button className="btn p-0 " onClick={delTodo}>
                            <span className="material-icons border-0" style={{ color: '#365e70' }}>delete</span>
                        </button>
                        <button className="btn p-0" onClick={editTodo}>
                            <span className="material-icons border-0" style={{ color: '#365e70' }}>edit</span>
                        </button>

                    </div>
                </ListGroup.Item>
                :
                <>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header >
                            <Modal.Title>edit todo</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Form.Control
                                type="text"
                                id="inputPassword5"
                                aria-describedby="passwordHelpBlock"
                                placeholder={textTodo}
                                value={editText}
                                onChange={inputHandler}
                            />
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={updateTodo} >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            }
        </>
    )
}
export default DoneTodo;
