import { Formik, Form, Field, ErrorMessage } from 'formik';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import * as Yup from 'yup';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/auth/operations';
import styles from './SignInForm.module.css';

const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password should be at least 6 symbols').required('Password is required')
});

const initialValues = {
    email: '',
    password: ''
};

function SignInForm() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const dispatch = useDispatch();

    const toggleMode = () => {
        setIsSignUp((prev) => !prev);
    };

    const handleSignIn = async (values, { resetForm }) => {
        try {
            const userData = {
                email: values.email,
                password: values.password
            };
            const actionResult = await dispatch(loginUser(userData));
            if (loginUser.fulfilled.match(actionResult)) {
                console.log('Login successful:', actionResult.payload);
            } else {
                console.log('Login failed:', actionResult.payload);
            }
            resetForm();
            setLoginError('');
            console.log('login form work OK');
        } catch (error) {
            console.log('login failed', error);
            setLoginError('Login failed');
        }
    };

    return (
        <div className={styles.container}>
            {isSignUp ? (
                <RegistrationForm />
            ) : (
                <>
                    <h1>Sign in</h1>
                    <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={handleSignIn}>
                        {() => (
                            <Form>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email" className={styles.label}>
                                        Email
                                    </label>
                                    <Field name="email" type="email" className={styles.input} />
                                    <ErrorMessage name="email" component="div" className={styles.error} />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="password" className={styles.label}>
                                        Password
                                    </label>
                                    <Field name="password" type="password" className={styles.input} />
                                    <ErrorMessage name="password" component="div" className={styles.error} />
                                </div>
                                {loginError && <div className={styles.error}>{loginError}</div>}
                                <button type="submit" className={styles.button}>
                                    Sign in
                                </button>
                            </Form>
                        )}
                    </Formik>
                </>
            )}
            <button onClick={toggleMode} className={styles.toggleButton}>
                {isSignUp ? 'Already have an account? Sign in' : "I'm new here, register an account"}
            </button>
        </div>
    );
}

export default SignInForm;
