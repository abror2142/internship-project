import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";

function PasswordChange () {
    const handlePasswordUpdate = async (json: string) => {
        console.log(json);
    }

    return (
        <Formik
            initialValues={{
                password: "",
                password_confirmation: ""
            }}
            onSubmit={async (values) => {
                const json = JSON.stringify(values);
                handlePasswordUpdate(json);
            }}
        >
            <Form className="flex flex-col gap-2 px-6 py-4 dark:bg-dark-bg rounded-md">
                <div className="flex gap-2 items-center">
                    <FontAwesomeIcon icon={faKey} className="text-2xl text-amber-400"/>
                    <p className="text-xl dark:text-dark-text-highlighted font-semibold">Password</p>
                </div>
                <div className="flex gap-6">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPassword">New Password</label>
                        <Field type="password" name="password" id="newPassword" className="dark:bg-dark-blue px-2 py-1 rounded-sm outline-none" placeholder="********" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="newPasswordConfirm">Confirm Password</label>
                        <div className="flex gap-6">
                            <Field type="password" id="newPasswordConfirm" name="password_confirmation" className="dark:bg-dark-blue px-2 py-1 rounded-sm outline-none" placeholder="********" />
                            <div>
                                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 px-2 py-1 rounded-sm text-white">Change</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default PasswordChange;