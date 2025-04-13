import { faEye, faEyeSlash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../shared/hooks/useAuth';

const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required('No password provided.') 
});

function Login () {
    const [show, setShow] = useState(false);
    const { login } = useAuth();

    return (
        <div 
            className="flex flex-col gap-2 max-w-sm mx-auto px-6 py-3 rounded-md
                    dark:bg-dark-card-light border dark:border-dark-border dark:text-dark-text"
        >
            <FontAwesomeIcon icon={faUnlock} 
                className="p-4 rounded-full text-indigo-400 text-2xl dark:bg-dark-blue max-w-mi mx-auto"
            />
            <p className="text-center text-2xl ">Sign In</p>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    const json = JSON.stringify(values);
                    login(json);
                }}
                >
                {({ errors, touched }) => (<Form className='flex flex-col gap-2'>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="dark:text-indigo-400">Email</label>
                        <Field
                            id="email"
                            name="email"
                            placeholder="jane@acme.com"
                            type="email"
                            className="dark:bg-dark-blue outline-none px-2 py-1 rounded-sm"
                        />
                        {errors.email && touched.email ? (
                            <p className="text-sm text-red-400 px-2">{errors.email}</p>
                        ) : null}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="dark:text-indigo-400">Password</label>
                        <div className="grid grid-cols-10 gap-1">
                            <Field 
                                id="password" 
                                name="password" 
                                className="dark:bg-dark-blue outline-none px-2 py-1 rounded-sm col-span-9 "
                                type={show ? "text" : "password"}
                            />
                            <div
                                className="flex items-center justify-center rounded-sm dark:bg-dark-blue "
                                onClick={() => setShow(prev => !prev)} 
                            >
                                <FontAwesomeIcon 
                                    icon={show ? faEyeSlash : faEye}
                                />
                            </div>
                        </div>
                        {errors.password && touched.password ? (
                            <p className="text-sm text-red-400 px-2">{errors.password}</p>
                        ) : null}
                    </div>

                    <button 
                        type="submit"
                        className={`px-3 py-1 mt-2 dark:bg-indigo-500 dark:text-dark-text-highlighted 
                                    max-w-min mx-auto rounded-sm dark:hover:bg-indigo-600 ${ (!touched || Object.keys(errors).length > 0) && 'cursor-not-allowed'}`}
                    >Submit</button>
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login;