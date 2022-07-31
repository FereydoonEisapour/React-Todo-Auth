import { auth } from '../../data/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail, selectUserName, selectUserAvatar, setUserLogOutState, selectUserCookie } from '../../features/userSlics';
import { Container, Navbar, Dropdown } from 'react-bootstrap';
import { Switch } from '@mui/material';
import useDarkMode from '../../hooks/DarkMode';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import userAvatarSvg from '../../assets/images/userAvatar.svg'

const Header = ({ toggleTheme, theme }) => {
    const dispath = useDispatch();
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
        <header>
            <nav className='d-flex justify-content-between align-items-center' >
                <Link to="/" className='col-6 m-2 p-0  text-logo '
                > React Todos</Link>
                <div className='d-flex m-2 align-items-center'>
                    <div className=''>
                        <Switch {...label} onClick={toggleTheme} className="" size='small'
                            checked={theme === 'light' ? false : true}
                        />
                    </div>
                    <div>
                        {userEmail ?
                            (<Dropdown className='col-2 border-fucus-white '>
                                <Dropdown.Toggle variant="" id="dropdown-basic-button">
                                    <img src={userAvatar ? userAvatar
                                        : userAvatarSvg}
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
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header;



{/* <Navbar.Brand className='col-10 m-0 p-0' style={{ fontSize: '2rem', color: '#007bff' }} href="#home">
                        react
                    </Navbar.Brand> */}