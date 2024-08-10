import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../redux/auth/operations';
import styles from './RegistrationForm.module.css';

function RegistrationForm() {
    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const initialValues = {
        firstName: '',
        lastName: '',
        userRole: 'INDIVIDUAL',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const SignUpSchema = Yup.object().shape({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        userRole: Yup.mixed().oneOf(['SHELTER', 'INDIVIDUAL']).required('User role is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .matches(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
            .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
            .matches(/(?=.*\d)/, 'Password must contain at least one digit')
            .matches(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character')
            .min(8, 'Password should be at least 8 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords are not matching')
            .required('Password confirmation is required')
    });

    const handleRegistration = async (values, { resetForm }) => {
        try {
            const userData = {
                firstName: values.firstName,
                lastName: values.lastName,
                userRole: values.userRole,
                email: values.email,
                password: values.password
            };
            const actionResult = await dispatch(registerUser(userData));
            if (registerUser.fulfilled.match(actionResult)) {
                console.log('Registration successful:', actionResult.payload);
            } else {
                console.log('Registration failed:', actionResult.payload);
            }
            resetForm();
            setError('');
            console.log('success');
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.log('error', err.message);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h1 className={styles.formHeader}>Sign Up</h1>
            <Formik validationSchema={SignUpSchema} initialValues={initialValues} onSubmit={handleRegistration}>
                {() => (
                    <Form>
                        <div className={styles.formGroup}>
                            <label htmlFor="firstName">First Name</label>
                            <Field type="text" id="firstName" name="firstName" />
                            <ErrorMessage name="firstName" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="lastName">Last Name</label>
                            <Field type="text" id="lastName" name="lastName" />
                            <ErrorMessage name="lastName" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="userRole">User Role</label>
                            <Field as="select" id="userRole" name="userRole">
                                <option value="INDIVIDUAL">Individual</option>
                                <option value="SHELTER">Shelter</option>
                            </Field>
                            <ErrorMessage name="userRole" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" />
                            <ErrorMessage name="email" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" />
                            <ErrorMessage name="password" component="div" className={styles.error} />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <Field type="password" id="confirmPassword" name="confirmPassword" />
                            <ErrorMessage name="confirmPassword" component="div" className={styles.error} />
                        </div>
                        {error && <div className={styles.error}>{error}</div>}
                        <button type="submit" className={styles.submitButton}>
                            Sign up
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default RegistrationForm;
