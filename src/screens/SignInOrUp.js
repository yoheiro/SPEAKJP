import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../Firebase';

class SignInOrUp extends React.Component {

    state = {
        loading: false, //spinner制御用
    }

    _isMounted = false;

    handleOnSubmit = (values) => {
        //spinner表示開始
        if (this._isMounted) this.setState({ loading: true })
        //サインイン（ログイン）処理
        firebase.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(res => {
                //正常終了時
                this.props.history.push("/");
                if (this._isMounted) this.setState({ loading: false });
            })
            .catch(error => {
                //異常終了時
                if (this._isMounted) this.setState({ loading: false });
                alert(error);
            });

    }

    componentDidMount = () => {
        this._isMounted = true;
    }

    componentWillUnmount = () => {
        this._isMounted = false;
    }

    render() {
        return (
            <div className="container">
                <div className="mx-auto" style={{ background: '#eee', padding: 20, marginTop: "10%",marginLeft: "5%" ,marginRight: "5%"}}>
                    <p style={{ textAlign: 'center' }}>Sign in</p>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => this.handleOnSubmit(values)}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().email().required(),
                            password: Yup.string().required(),
                        })}
                    >
                        {
                            ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                                <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
                                    <div style={{ textAlign: 'center' }}>
                                        <Button color="primary" type="submit" disabled={this.state.loading}>
                                        SIGN IN
                                        </Button>
                                    </div>
                                </form>
                            )
                        }
                    </Formik>
                </div>
                <div className="mx-auto" style={{ width: 400, background: '#fff', padding: 20 }}>
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </div>
                <div className="mx-auto" style={{ width: 400, background: '#fff', padding: 20 }}>
                    <Link to="/Welcome">Click here for more information about this site</Link>
                </div>

            </div>
        );
    }
}

export default withRouter(SignInOrUp);