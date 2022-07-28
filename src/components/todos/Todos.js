import AddTodo from "../addTodo/AddTodo";
import DoneTodos from "./done/DoneTodos";
import UnDoneTodos from "./undone/UnDoneTodos";
import SignInPage from './../auth/SignInPage';
import { useSelector } from 'react-redux';
import { selectUserEmail } from './../../features/userSlics';
function Todos() {
  const userEmail = useSelector(selectUserEmail);
  return (
    <div className="row justify-content-center mx-4 mt-0  h-100" >
      {userEmail ? (
        <div className="">
          <div className="d-flex justify-content-center">
            <AddTodo />
          </div>
          <div className="d-flex row justify-content-evenly">
            <UnDoneTodos className="" />
            <DoneTodos className="" />
          </div>
        </div>
      ) : (<SignInPage />)}
    </div>
  )
}
export default Todos