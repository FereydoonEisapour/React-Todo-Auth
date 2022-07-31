import SignInPage from '../components/auth/SignInPage';
import Todos from '../components/todos/Todos';
import UserProfile from '../components/user/UserProfile';
const Routes = [{
    exact: true,
    path: '/',
    component: Todos
}, {
    path: '/signin',
    component: SignInPage
}, {
    path: '/user',
    component: UserProfile
}]

export default Routes;