import React, { useEffect, useState } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectUserEmail } from '../../../features/userSlics';
import db from '../../../data/firebase';
import DoneTodo from './DoneTodo';
function DoneTodos() {
    const userEmail = useSelector(selectUserEmail);
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        if (userEmail) {
            db.collection(userEmail).doc(userEmail).collection('todos').where("done", "==", true).onSnapshot(snapshot => {
                setTodos(snapshot.docs.map(doc => ({ id: doc.id, done: doc.data().done, todo: doc.data().todo })))
            })
        }
    }, [userEmail])
    return (
        <ListGroup className="my-4 col-lg-4" style={{ width: " 28rem" }}>
            <ListGroup.Item active className="w-100 d-flex justify-content-between" >
                <div className="lead">DONE</div>
                <div ><Badge variant="light" className='bg-light text-primary'>{todos.length}</Badge> </div>
            </ListGroup.Item>
            {todos.map(todo =>
                <DoneTodo key={todo.id} textTodo={todo.todo} id={todo.id} done={todo.done} />
            )}
        </ListGroup>
    )
}
export default DoneTodos
