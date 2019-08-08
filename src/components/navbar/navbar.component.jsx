import React from 'react';
import { NavLink } from 'react-router-dom';
import { Modal, Input } from 'antd';
import Login from '../login/login.component';

import style from './navbar.module.scss';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignInProcess: true,
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false
    };
  }
  handleRegistration() {
    this.handleCancel();
    this.props.history.push('/registration');
  }

  handleSignin() {
    this.setState({
      visible: false
    })
    this.props.onSignin();
    this.props.history.push('/home');
  };

  handleSignOut() {
    window.localStorage.setItem('beermapAuth', '');
    this.props.onSignout();
  }

  toggleRegister() {
    this.setState({
      isSignInProcess: false
    });
  }

  toggleSignIn() {
    this.setState({
      isSignInProcess: true
    });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <header className={style['header-wrapper']}>
        <nav className={style['nav-bar-wrapper']}>
          <ul className={style['nav-bar']}>
            <li className={style['nav-bar-menu']}>Beer Map</li>
            <li className={style['nav-bar-menu']}>
              <NavLink exact activeClassName="is-active" to="/home">
                Home
              </NavLink>
            </li>
            <li className={style['nav-bar-menu']}>
              <NavLink exact activeClassName="is-active" to="/beers">
                My Beers
              </NavLink>
            </li>
            <li
              className={`${style['nav-bar-menu'] + ' ' + style['isLogin']}`}
              style={{
                marginLeft: 'auto'
              }}
            >
              {this.props.isLogInUser ? (
                [
                  <span key="welcome" className={style['welcome-msg']}>
                    <span className={style['welcome-msg-text']}>
                      Welcome,&nbsp;
                    </span>
                    {this.props.nickname}
                  </span>,
                  <span
                    key="sign-out"
                    className={style['sign-out']}
                    onClick={e => this.handleSignOut(e)}
                  >
                    Sign Out
                  </span>
                ]
              ) : (
                <a
                  className={style['sign-out']}
                  href="javascript:void(0)"
                  onClick={this.showModal}
                >
                  Sign in/Register
                </a>
              )}
            </li>
          </ul>
        </nav>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          footer={null}
        >
          <p>{ModalText}</p>
          <div
            // className={style['sign-in']}
            style={{
              display: this.state.isSignInProcess ? '' : 'none'
            }}
          >
            <Login
              closePopup={e => {
                this.handleRegistration(e);
              }}
              onSignin={e => {
                this.handleSignin(e);
              }}
            />
          </div>

          <div
            className={style['register']}
            style={{
              display: this.state.isSignInProcess ? 'none' : ''
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <Input placeholder="Email" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Input.Password placeholder="Password" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Input.Password placeholder="Confirm password" />
            </div>
            <a href="javascript:void(0)" onClick={e => this.toggleSignIn(e)}>
              Already have an account? Sign in instead.
            </a>
          </div>
        </Modal>
      </header>
    );
  }
}


export default Navbar;
