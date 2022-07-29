import { auth } from '../../data/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail, selectUserName, selectUserAvatar, setUserLogOutState, selectUserCookie } from '../../features/userSlics';
import { Container, Navbar, Dropdown } from 'react-bootstrap';
import { Switch } from '@mui/material';
import useDarkMode from '../../hooks/DarkMode';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
function Header() {
    const dispath = useDispatch();
    const [theme, toggleTheme] = useDarkMode()
    const userName = useSelector(selectUserName);
    const userEmail = useSelector(selectUserEmail);
    const userAvatar = useSelector(selectUserAvatar);

    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const handelSignOut = () => {
        auth.signOut().then((result) => {
            document.cookie = null
            dispath(setUserLogOutState({
            }));
        })
            .cath((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            })
    }

    
    return (
        <Navbar className='d-flex w-100' bg={theme} variant="light">
            <Container >
                <Link to="/" className='col-10 m-0 p-0' style={{ textDecoration: 'none', fontSize: '2rem', color: '#007bff' }}> React Todos</Link>

                {/* <Navbar.Brand className='col-10 m-0 p-0' style={{ fontSize: '2rem', color: '#007bff' }} href="#home">
                    react
                </Navbar.Brand> */}
                <Switch {...label} onClick={toggleTheme}
                    checked={theme === 'light' ? false : true}
                />
                {/* <button onClick={toggleTheme}>dark</button> */}
                {userEmail ?
                    (<Dropdown className='col-2 border-fucus-white '>
                        <Dropdown.Toggle variant="" id="dropdown-basic-button">
                            <img src={userAvatar ? userAvatar
                                : 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='}
                                alt="avatar" width="32" height="32" className="ml-5 rounded-circle" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <div className='mx-3' >
                                <Link to="/user" style={{ textDecoration: 'none' }}>Profile</Link>
                            </div>
                            <Dropdown.Item href="" onClick={handelSignOut}>Log out</Dropdown.Item>
                            <Dropdown.Item href="">Another action</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>)
                    : ('')}
            </Container>
        </Navbar>
    )
}
export default Header;