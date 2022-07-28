import { useState } from 'react';
import { Form, Col, Button, ListGroup } from 'react-bootstrap';
import db from '../../data/firebase';
import firebase from 'firebase/compat/app';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../../features/userSlics';
function AddTodo() {
    const userEmail = useSelector(selectUserEmail);
    const [text, setText] = useState('');
    let addTodoButton = (e) => {
        e.preventDefault()
        db.collection(userEmail).doc(userEmail).collection('todos').add({
            todo: text,
            done: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setText('');
    }
    let inputHandler = (e) => {
        setText(e.target.value)
    }
    return (
        <ListGroup className=" my-4 col-md-8 col-lg-4" style={{ width: " 30rem" }} >
            <ListGroup.Item active className="w-100 d-flex justify-content-between align-content-center" >
                <div className="lead">Add Your Todo</div>
            </ListGroup.Item>
            <ListGroup.Item>
                <Form className='' >
                    <Form.Row className="justify-content-around d-flex">
                        <Col xs="auto" className=" col-8">
                            <Form.Label htmlFor="inlineFormInput" srOnly>
                                Name
                            </Form.Label>
                            <Form.Control
                                className="mb-2 "
                                id="inlineFormInput"
                                placeholder="Todo"
                                value={text}
                                onChange={inputHandler}
                            />
                        </Col>
                        <Col xs="auto" className="col-2 mx-1">
                            <Button type="submit" onClick={addTodoButton} className="mb-2 " disabled={!text}>
                                Add
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>
            </ListGroup.Item>
        </ListGroup>
    )
}
export default AddTodo;