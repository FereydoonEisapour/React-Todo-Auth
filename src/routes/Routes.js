import SignInPage from '../components/auth/SignInPage';
import Todos from '../components/todos/Todos';
import User from '../components/user/User';
const Routes = [{
    exact: true,
    path: '/',
    component: Todos
}, {
    path: '/signin',
    component: SignInPage
}, {
    path: '/user',
    component: User
}]

export default Routes;