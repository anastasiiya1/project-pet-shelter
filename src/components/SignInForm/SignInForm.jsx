import { Formik, Form, Field, ErrorMessage } from 'formik';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import * as Yup from 'yup';
import { useState } from 'react';
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

    const toggleMode = () => {
        setIsSignUp((prev) => !prev);
    };
    return (
        <div className={styles.container}>
            {isSignUp ? (
                <RegistrationForm />
            ) : (
                <>
                    <h1>Sign in</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignInSchema}
                        onSubmit={(values) => {
                            console.log('form data', values);
                        }}
                    >
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
