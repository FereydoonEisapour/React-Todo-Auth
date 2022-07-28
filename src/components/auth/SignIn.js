import { auth, provider } from '../../data/firebase';
import { setActiveUser } from '../../features/userSlics';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import toast from 'react-hot-toast';
import { TextField } from '@mui/material';
import '../../App.css';
function SignInPage({ SignInPageType }) {
    const dispath = useDispatch();

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const inputEmailHandler = (e) => { setEmail(e.target.value.trim()) }
    const inputPasswordHandler = (e) => { setPassword(e.target.value.trim()) }

    const SignInUserWithEmailAndPassword = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            dispath(setActiveUser({
                userEmail: userCredential.user.email,
                userPassword: userCredential.user.password,
            }),
            )
            toast.success('You are login succesfull.')
        })
            .catch(() => {
                toast.error('The email address is not found.')
            })
    }
    const handelSignInWithGoogle = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).then((result => {
            console.log(result);
            dispath(setActiveUser({
                userName: result.user.displayName,
                userEmail: result.user.email,
                userAvatar: result.user.photoURL,
            }, toast.success('You are login succesfull.')
            ))
        }))
    }

    const ResetPassword = (e) => {
        e.preventDefault()
        if (email.length === 0) {
            toast.error('Please inter your Email ')
        } else {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    toast.success('We send reset password link to your Mail')
                })
                .catch(() => {
                    toast.error('Something is wrong')
                })
        }
    }
    return (

        <div className="modal modal-signin position-static d-block  " tabIndex="-1" role="dialog" id="modalSignin">
            <div className="modal-dialog" role="document">
                <div className="modal-content rounded-2 shadow border-0 ">
                    <div className="modal-body p-4 pt-0 ">
                        <form className="mt-3 ">
                            <div className="form-floating mb-3">
                                <TextField required fullWidth label="Email" id="fullWidth" onChange={e => inputEmailHandler(e)} />
                                {/* <small className='text-danger'>{emailInputMessage}</small> */}
                            </div>
                            <div className="form-floating mb-3">


                                <TextField required fullWidth label="Password" id="fullWidth-password-input" type="password"
                                    autoComplete="current-password"
                                    onChange={e => inputPasswordHandler(e)} />
                                {/* <small className='text-danger'>{passwordInputMessage}</small> */}
                            </div>

                            <div className='mt-1 d-flex justify-content-end ' >
                                <button style={{ fontSize: '13px' }} className='mb-1 mx-1 bg-light border-0 ' type="submit"
                                    onClick={e => ResetPassword(e)}
                                >Forgotten password? </button>
                            </div>
                            <button className="w-100 mb-5 btn btn-lg rounded-3 btn-primary" type="submit"
                                onClick={e => SignInUserWithEmailAndPassword(e)} >Sign in </button>

                            <div className='d-flex align-align-content-between justify-content-center mx-auto'>
                                <button className=" py-2 mb-2 btn btn-outline-primary rounded-5 mx-1 " type="submit"
                                    onClick={handelSignInWithGoogle}>
                                    <span className="bi me-1 mr-3 " width="16" height="16">
                                        <i className="fa fa-google" style={{ fontSize: "24px" }}></i>
                                    </span>
                                </button>
                                <button className=" py-2 mb-2 btn btn-outline-primary rounded-5 mx-1 " type="submit" disabled
                                // onClick={handelSignInWithGoogle}
                                >
                                    {/*  */}

                                    <span className="bi me-1 mr-3 " width="16" height="16">
                                        <i className="fa fa-twitter" style={{ fontSize: "24px" }}></i>
                                    </span>
                                </button>
                                <button className=" py-2 mb-2 btn btn-outline-dark rounded-5 mx-1 " type="submit" disabled
                                // onClick={handelSignInWithGoogle}
                                >
                                    <span className="bi me-1 mr-3 " width="16" height="16">
                                        <i className="fa fa-apple" style={{ fontSize: "24px" }}></i>
                                    </span>
                                </button>
                            </div>
                            <hr className="my-1" />
                            <div className='mt-3  d-flex  justify-content-center' >
                                <span>Don't have an account? </span>
                                <span className='text-primary fs-6 mx-2 bg-light border-0'
                                  
                                    onClick={SignInPageType}>Sign up
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignInPage;