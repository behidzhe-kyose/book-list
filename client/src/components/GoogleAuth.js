import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { GoogleOutlined } from '@ant-design/icons';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '592968066984-af5ollqfijkjoitqompaq1jdp22qdk4l.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()

    }

    renderAuthButtons = () => {
        if(this.props.isSignedIn === null) {
            return null
        }
        else if(this.props.isSignedIn) {
            return (
                <Button type="primary" shape="round" icon={<GoogleOutlined/>} danger onClick={this.onSignOutClick}>
                    Sign Out
                </Button>
            )
        } else {
            return (
                <Button type="primary" shape="round" icon={<GoogleOutlined/>} danger onClick={this.onSignInClick}>
                    Sign In
                </Button>
            )
        }
    } 
    render() {
        return (
            <div>{this.renderAuthButtons()}</div>
        )
    }
}

const mapStateToProps = state => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);