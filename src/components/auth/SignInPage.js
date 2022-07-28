import { auth, provider } from '../../data/firebase';
import { setActiveUser } from '../../features/userSlics';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import toast from 'react-hot-toast';

import { TextField } from '@mui/material';
import signInSvg from '../../assets/images/undraw_fingerprint_re_uf3f.svg';
import signUpSvg from '../../assets/images/undraw_voice_assistant_nrv7.svg';
import SignIn from './SignIn'
import SignUp from './SignUp'
import '../../App.css';
function SignInPage() {
  const dispath = useDispatch();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);


  const [loginCard, setLoginCard] = useState(false);

  const inputEmailHandler = (e) => { setEmail(e.target.value.trim()) }
  const inputPasswordHandler = (e) => { setPassword(e.target.value.trim()) }

  const createUserWithEmailAndPassword = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password).then((result) => {
      dispath(setActiveUser({
        userEmail: result.user.email,
        userPassword: result.user.password
      }))
      toast.success('You are sign up succesfull.')
    }).catch(() => {
      toast.error('The email address is already in use by another account. reset password')
    })
    // if (email === null) { setEmailInputError(true) || setEmailInputMessage('Require') } else { setEmailInputError(false) || setEmailInputMessage('') }
    // if (password === null) { setPasswordInputError(true) || setPasswordInputMessage('Require') } else { setPasswordInputError(false) || setPasswordInputMessage('') }
    // if (email !== null && password !== null) {
    // }
  }
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

    // if (email === null) { setEmailInputError(true) || setEmailInputMessage('Require') } else { setEmailInputError(false) || setEmailInputMessage('') }
    // if (password === null) { setPasswordInputError(true) || setPasswordInputMessage('Require') } else { setPasswordInputError(false) || setPasswordInputMessage('') }
    // if (email !== null && password !== null) {
    // }
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

    <>{!loginCard ? (

      //  login
      <section className="d-flex  ">
        {/*  sign in left  */}
        <div className=" scale-up-center col-lg-6  d-flex justify-content-center align-item-center align-content-center ">
          <img className='imgimg-fluid w-75 ' src={signInSvg} alt="singin" />
        </div>
        {/* sign in right */}
        <div className="col-12 col-lg-6  justify-content-center align-item-center align-content-center ">
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
                      <button className='text-primary fs-6 mx-2 bg-light border-0'
                        onClick={() => setLoginCard(true)}>Sign up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ) : (
      //  sign up
      <section className="d-flex section_signin ">
        {/*  sign in left  */}
        <div className="scale-up-center col-lg-6  d-flex justify-content-center align-item-center align-content-center ">
          <img className='imgimg-fluid w-75 ' src={signUpSvg} alt="" />
        </div>
        {/* sign in right */}
        <div className="col-12 col-lg-6  " >
          <div className=" modal modal-signin position-static d-block " tabIndex="-1" role="dialog" id="modalSignin">
            <div className="modal-dialog" role="document">
              <div className="modal-content rounded-2 shadow  border-0">
                <div className="modal-body p-4 pt-0">
                  <form className="mt-3">
                    <div className="form-floating mb-3">
                      <TextField required fullWidth label="Email" id="fullWidth" onChange={e => inputEmailHandler(e)} />
                      {/* <small className='text-danger'>{emailInputMessage}</small> */}
                    </div>
                    <div className="form-floating mb-5">
                      <TextField required fullWidth label="Password" id="fullWidth-password-input" type="password"
                        autoComplete="current-password"
                        onChange={e => inputPasswordHandler(e)} />
                      {/* <small className='text-danger'>{passwordInputMessage}</small> */}
                    </div>
                    <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary mb-5" type="submit"
                      onClick={createUserWithEmailAndPassword}>Sign up
                    </button>
                    <div className='d-flex align-align-content-between justify-content-center mx-auto'>
                      <button className=" py-2 mb-2 btn btn-outline-primary rounded-5 mx-1 " type="submit"
                        onClick={handelSignInWithGoogle}>
                        <span className="bi me-1 mr-3 " width="16" height="16">
                          <i className="fa fa-google" style={{ fontSize: "24px" }}></i>
                        </span>
                      </button>
                      <button className=" py-2 mb-2 btn btn-outline-primary rounded-5 mx-1 " type="submit" disabled
                        onClick={handelSignInWithGoogle}>
                        <span className="bi me-1 mr-3 " width="16" height="16">
                          <i className="fa fa-twitter" style={{ fontSize: "24px" }}></i>
                        </span>
                      </button>
                      <button className=" py-2 mb-2 btn btn-outline-dark rounded-5 mx-1 " type="submit" disabled
                        onClick={handelSignInWithGoogle}>
                        <span className="bi me-1 mr-3 " width="16" height="16">
                          <i className="fa fa-apple" style={{ fontSize: "24px" }}></i>
                        </span>
                      </button>
                    </div>
                    <hr className="my-1" />
                    <div className='mt-3  d-flex  justify-content-center' >
                      <button className='  btn btn-md text-primary btn-outline-none  ' type="submit"
                        onClick={() => setLoginCard(false)}>Log in</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>
    )}
    </>
  );
}
export default SignInPage;













// <section className='d-flex '>
// <div className=" col-lg-6  d-flex justify-content-center align-item-center align-content-center ">
//   {
//     !loginCard ?
//       <img className='imgimg-fluid w-75 ' src={signInSvg} alt="singin" />
//       :
//       <img className='imgimg-fluid w-75 ' src={signUpSvg} alt="singin" />
//   }
// </div>
// <div className="col-12 col-lg-6  justify-content-center align-item-center align-content-center ">
//   {
//     !loginCard ?
//       <SignIn SignInPageType={(loginCard) => setLoginCard(loginCard)} />
//       :
//       <SignUp SignInPageType={(loginCard) => setLoginCard(loginCard)} />
//   }
// </div>
// </section>