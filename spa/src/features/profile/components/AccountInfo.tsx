import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { me } from "../api/profileService";
import { UserMe } from "../../shared/types/user";
import { useAuth } from "../../shared/hooks/useAuth";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function AccountInfo () {
    const [userMe, setUserMe] = useState<UserMe | null>(null);
    const { user } = useAuth();

    const fetchUserMeData  = async () => {
        try {   
            const data = await me();
            setUserMe(data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchUserMeData();
    }, [])

    return (
        <Formik
            initialValues={{
                name: userMe?.name
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <Form className="flex flex-col gap-4 grow-1 dark:text-dark-text dark:bg-dark-bg px-6 py-4 rounded-md">
                <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faCircleUser} className="text-2xl text-green-500"/>
                    <p className="text-xl font-semibold dark:text-dark-text-highlighted">Account</p>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" >Name</label>
                    <div className="flex w-full gap-4 items-center">
                        <input type="text" name="name" id="name"  className="grow-1 dark:bg-dark-blue px-2 py-1.5 rounded-sm outline-none"/>
                        <button type="submit" className="bg-indigo-500 px-2 py-1.5 max-w-min text-white hover:bg-indigo-600 rounded-sm self-end">Update</button>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <p>Email</p>
                    <p className="dark:bg-dark-blue px-2 py-1.5 rounded-sm">{userMe?.email}</p>
                </div>
                <div className="flex flex-col gap-1">
                    <p>Role(s)</p>
                    <div className="dark:bg-dark-blue px-2 py-1.5 rounded-sm">
                        {user?.roles.map(role => (
                            <p>{role}</p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <p>Memeber Since</p>
                    <p className="dark:bg-dark-blue px-2 py-1.5 rounded-sm">{dayjs(userMe?.created_at).format('YYYY.MM.DD')}</p>
                </div>
            </Form>
        </Formik>
    )
}

export default AccountInfo;