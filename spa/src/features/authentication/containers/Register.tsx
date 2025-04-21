import { faEye, faEyeSlash, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuth } from '../../shared/hooks/useAuth';
import UserPhoto from './UserPhoto';
import UserInfo from './UserInfo';
import { AxiosError } from 'axios';
import { ZodError } from 'zod';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password must be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required")
});

function Register () {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<number>(1);
    
    const { register } = useAuth();

    const handleRegister = async (json: string) => {
        try {
            setLoading(true);
            await register(json);
            setStep(2);
        } catch(error) {
            if(error instanceof AxiosError) {
                setError("Can't be registered.")
            } else if(error instanceof ZodError) {
                setError("Not registered. Server responded with unexpected data.")
            } else {
                setError('Not registered. Error occured');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div 
            className="relative flex flex-col gap-2 max-w-sm mx-auto px-6 py-3 rounded-md min-w-sm 
                    dark:bg-dark-card-light border dark:border-dark-border dark:text-dark-text max-h-min mt-5"
        >
            {
                step == 2
                ? <UserPhoto setStep={setStep} />
                : step == 3
                ? <UserInfo />
                : <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: '',
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={async (values) => {
                        const json = JSON.stringify(values);
                        handleRegister(json);
                    }}
                >
                    {({ errors, touched }) => (<Form className='flex flex-col gap-2'>
                        <FontAwesomeIcon icon={faRightToBracket} 
                            className="p-4 rounded-full text-indigo-400 text-2xl dark:bg-dark-blue max-w-mi mx-auto"
                        />
                        <p className="text-center text-2xl ">Sign Up</p>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="dark:text-indigo-400">Full Name</label>
                            <Field 
                                id="name" 
                                name="name" 
                                placeholder="Jane Doe" 
                                className="dark:bg-dark-blue outline-none px-2 py-1 rounded-sm"
                            />
                            {errors.name && touched.name ? (
                                <p className="text-sm text-red-400 px-2">{errors.name}</p>
                            ) : null}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="dark:text-indigo-400">Email</label>
                            <Field
                                id="email"
                                name="email"
                                placeholder="jane@doe.com"
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
                            <label htmlFor="password_confirmation" className="dark:text-indigo-400">Confirm Password</label>
                            <Field 
                                id="password_confirmation" 
                                name="password_confirmation"
                                className="dark:bg-dark-blue outline-none px-2 py-1 rounded-sm"
                                type={show ? "text" : "password"}
                            />
                            {errors.password_confirmation && touched.password_confirmation ? (
                                <p className="text-sm text-red-400 px-2">{errors.password_confirmation}</p>
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
            }
            {
                loading
                && <div className="">
                    <div role="status" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  inset-0 w-full h-full backdrop-blur-[2px]  bg-black/10 flex items-center justify-center z-50">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path 
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" 
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Register;