import SignInPage from '../pages/auth/SignInPage';
import Todos from '../pages/todos/Todos';
import UserProfile from '../pages/user/UserProfile';
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