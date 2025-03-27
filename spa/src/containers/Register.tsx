import { faEye, faEyeSlash, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
 
const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password must be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required")
});

function Register () {
    const [show, setShow] = useState(false);

    return (
        <div 
            className="flex flex-col gap-2 max-w-sm mx-auto px-6 py-3 rounded-md
                    dark:bg-dark-card-light border dark:border-dark-border dark:text-dark-text"
        >
            <FontAwesomeIcon icon={faRightToBracket} 
                className="p-4 rounded-full text-indigo-400 text-2xl dark:bg-dark-blue max-w-mi mx-auto"
            />
            <p className="text-center text-2xl ">Sign Up</p>
            <Formik
                initialValues={{
                    fullName: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
                >
                {({ errors, touched }) => (<Form className='flex flex-col gap-2'>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="dark:text-indigo-400">Full Name</label>
                        <Field 
                            id="fullName" 
                            name="fullName" 
                            placeholder="Jane Doe" 
                            className="dark:bg-dark-blue outline-none px-2 py-1 rounded-sm"
                        />
                        {errors.fullName && touched.fullName ? (
                            <p className="text-sm text-red-400 px-2">{errors.fullName}</p>
                        ) : null}
                    </div>

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

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className="dark:text-indigo-400">Confirm Password</label>
                        <Field 
                            id="confirmPassword" 
                            name="confirmPassword"
                            className="dark:bg-dark-blue outline-none px-2 py-1 rounded-sm"
                            type={show ? "text" : "password"}
                        />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <p className="text-sm text-red-400 px-2">{errors.confirmPassword}</p>
                        ) : null}
                    </div>

                    <button 
                        type="submit"
                        className={`px-3 py-1 mt-2 dark:bg-indigo-500 dark:text-dark-text-highlighted 
                                    max-w-min mx-auto rounded-sm dark:hover:bg-indigo-600 ${errors && "cursor-not-allowed"}`}
                        disabled={!!errors}
                    >Submit</button>
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default Register;