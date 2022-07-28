import { useEffect, useState} from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import UnDoneTodo from './UnDoneTodo';
import db from '../../../data/firebase';
import {  useSelector } from 'react-redux';
import { selectUserEmail } from '../../../features/userSlics';
function UnDoneTodos() {
    const [todos, setTodos] = useState([]);
    const userEmail = useSelector(selectUserEmail);
    useEffect(() => {
        if (userEmail) {
            db.collection(userEmail).doc(userEmail).collection('todos').where("done", "==", false).onSnapshot(snapshot => {
                setTodos(snapshot.docs.map(doc => ({ id: doc.id, done: doc.data().done, todo: doc.data().todo })))
            })
        }
    }, [userEmail])
    return (
        <ListGroup className=" my-4 col-lg-4 " style={{ width: " 28rem" }}>
            <ListGroup.Item active className="w-100 d-flex justify-content-between" >
                <div className="lead">DO</div>
                <div >
                    <Badge variant="light" className='bg-light text-primary'>{todos.length}
                    </Badge> </div>
            </ListGroup.Item>
            {todos.map(todo =>
                <UnDoneTodo
                    key={todo.id} textTodo={todo.todo} id={todo.id}
                />
            )}
        </ListGroup>
    )
}
export default UnDoneTodos
