import { Field, Formik, Form } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { fetchAllCountries } from "../../shared/api/apiService";
import { Option } from "../../shared/types/select";
import { customStyles } from "../../file/components/Filters";
import { Country, UserInfo } from "../../shared/types/fileTypes";
import { fetchUserInfo } from "../../shared/api/apiService";
import { useAuth } from "../../shared/hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { updateUserInfo } from "../api/authService";
import { useNavigate } from "react-router-dom";

function UserInfoForm ({setStep}: {setStep: React.Dispatch<React.SetStateAction<number>>}) {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selected, setSelected] = useState<Option | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const { user } = useAuth()
    const navigate = useNavigate();
    
    const fetchCountries = async () => {
        try {
            const data = await fetchAllCountries();
            setCountries(data);
        } catch(e) {
            console.log(e);
        }
    }

    const fetchCurrentUserInfo = async () => {
        try {
            const data = await fetchUserInfo();
            setUserInfo(data);
            if(data?.country) {
                setSelected({label: data?.country.name, value: data?.country.code})
            }
        } catch(e) {
            console.log(e);
        }
    }

    console.log(userInfo)

    useEffect(() => {
        fetchCountries();
        if(user) {
            fetchCurrentUserInfo();
        }
    }, []);

    const handleUpdate = async (json: string) => {
        try {
            const response = await updateUserInfo(json);
            console.log(response.status);
            if(response.status === 200) {
                return navigate('/my-drive');
            }
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    id: userInfo?.id,
                    birthdate: userInfo ? userInfo.birthdate : null,
                    job: userInfo ? userInfo.job : null,
                    phoneNumber: userInfo ? userInfo.phoneNumber : null,
                    country_id: selected ? countries.find(country => country.code == selected.value)?.id : null,
                    address: userInfo ? userInfo.address : null
                }}
                enableReinitialize={true}
                onSubmit={async (values) => {
                    const json = JSON.stringify(values);
                    handleUpdate(json);
                }}
            >
                <Form className="flex flex-col gap-4">
                    <Link to={'/my-drive'}>
                        skip
                    </Link>
                    <p className="text-xl font-semibold dark:text-dark-text-highlighted text-center">Tell us More!</p>
                    <div className="flex flex-col gap-1">
                        <label>Job</label>
                        <Field name="job" id="job"  className="dark:bg-dark-blue px-2 py-1 rounded-sm outline-none" placeholder="Software Engineer" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Birth Day</label>
                        <Field name="birthdate" type="date" id="birthdate"  className="dark:bg-dark-blue px-2 py-1 rounded-sm outline-none" placeholder="" />
                    </div>
                    <div className="flex gap-2 w-full">
                        <div className="flex gap-1 flex-col">
                            <p>Country</p>
                            <Select 
                                styles={customStyles()}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                options={countries.map(country => ({label: country.name, value: country.code}))}
                                onChange={(option) => setSelected(option)}
                                value={selected}
                            />
                        </div>
                        <div className="flex flex-col gap-1 grow-1">
                            <label>Phone Number</label>
                            <Field id="phoneNumber" name="phoneNumber"  className="grow-1 dark:bg-dark-blue px-2 py-1 rounded-sm outline-none" placeholder="" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Address</label>
                        <Field id="address" name="address" className="dark:bg-dark-blue px-2 py-1 rounded-sm outline-none" placeholder=""  />
                    </div>
                    <div>
                        <button onClick={() => setStep(2)} type="button">
                            <FontAwesomeIcon icon={faChevronLeft} /> Previous
                        </button>
                        <button type="submit">Complete</button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default UserInfoForm;