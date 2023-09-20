import React, { useEffect, useState } from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import './dashboard.css'
import { addUserToContact, getContactList } from "../../service/userSvc";
import LoaderPage from "../layout/LoadingPage";
import { phoneRegex } from "../login/RegistrationPage";
import { useForm } from "react-hook-form";
import Button from "../layout/button";

const AddContactPopover = (prop) => {
    const [isLoading, setIsLoading] = useState(false);
    const [contactList, setContactList] = useState([]);
    const [invite, setInvite] = useState(false)
    const [errMsg, setErrMsg] = useState("");

    const { register, handleSubmit, getValues, setValue, formState: { errors },
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: {
            firstName: '',
            lastName: '',
            mobileNumber: '',
        }
    });

    const resetData = () => {
        setValue('firstName', '')
        setValue('lastName', '')
        setValue('mobileNumber', '')
    }

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await getContactList(prop.userId);
            setContactList(response.data.data);
        } catch (error) {
            setErrMsg(error?.response?.data?.msg);
        } finally {
            setIsLoading(false);
        }
    };

    const addToContact = async () => {
        try {
            setIsLoading(true)
            await addUserToContact({
                user_id: prop.userId,
                mobile_number: getValues('mobileNumber'),
                first_name: getValues('firstName'),
                last_name: getValues('lastName'),
            })
            window.location.reload();
            return
        } catch (error) {
            setErrMsg(error?.response?.data?.msg);
        } finally {
            setIsLoading(false);
        }
    }

    let availableContacts = []

    for (let i = 0; i < contactList.length; i++) {
        let flag = false
        prop.addedContact.filter(c => {
            if (contactList[i].user_id === c.contact_user_id) {
                flag = true
            }
        })
        if (!flag) {
            availableContacts.push(contactList[i])
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    if (isLoading) {
        <LoaderPage />;
    }

    return (
        <OverlayTrigger
            placement="bottom"
            trigger="click"
            rootClose
            overlay={(
                <Popover>
                    {!invite &&
                        <>
                            <div className="contact-form-box">
                                <div className='text-center'>
                                    <h4>Add Contact</h4>
                                </div>
                                <form autoComplete="on" onSubmit={handleSubmit(addToContact)}>
                                    <div className="form-group">
                                        <label>Contact</label>
                                        <br></br>
                                        <select
                                            id="Contact"
                                            className="form-select mb-2"
                                            aria-label="Contact"
                                            onChange={(e) => {
                                                const contactDetails = e.target.value.split(":")
                                                setValue('firstName', contactDetails[0])
                                                setValue('lastName', contactDetails[1])
                                                setValue('mobileNumber', contactDetails[2])
                                            }}
                                        >
                                            <option defaultValue={""} />
                                            {availableContacts.map(contact => {
                                                return (
                                                    <option key={contact.user_id} value={`${contact.first_name}:${contact.last_name}:${contact.mobile_number}`}>
                                                        {`${contact.first_name} ${contact.last_name}:${contact.mobile_number}`}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <Button
                                            btnColor="btn-dark"
                                            label="Add"
                                            isLoading={isLoading}
                                        />
                                    </div>
                                    <div className="text-center ">
                                        <a onClick={() => {
                                            setInvite(true)
                                            resetData()
                                        }}
                                            className="text-primary">
                                            invite a friend
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </>
                    }
                    {
                        invite &&
                        <>
                            <div className="invite-box">
                                <div className='text-center'>
                                    <h4>Invite a friend</h4>
                                </div>
                                <form autoComplete="on" onSubmit={handleSubmit(addToContact)}>
                                    <div className="form-group">
                                        <label>Mobile Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            {...register("mobileNumber", {
                                                required: "Phone Number Required",
                                                validate: (v) => {
                                                    if (!phoneRegex.test(v)) {
                                                        return (
                                                            "Enter Valid Phone Number..."
                                                        );
                                                    }
                                                    return true;
                                                }
                                            })}
                                        />
                                        {errors.mobileNumber && (
                                            <div className="field-err">
                                                {errors.mobileNumber.message}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            aria-label="FirstName"
                                            {...register("firstName", {
                                                required: "First Name Required",
                                            })}
                                        />
                                        {errors.firstName && (
                                            <div className="field-err">
                                                {errors.firstName.message}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>

                                        <input
                                            type="text"
                                            pattern="^[a-zA-Z][a-zA-Z\\s]+$"
                                            className="form-control"
                                            aria-label="LastName"
                                            {...register("lastName", {
                                                required: "Last Name Required",
                                            })}
                                        />
                                        {errors.lastName && (
                                            <div className="field-err">
                                                {errors.lastName.message}
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center pt-1 mb-5 pb-1">
                                        <Button
                                            btnColor="btn-dark"
                                            label="Invite"
                                            isLoading={isLoading}
                                        />
                                    </div>
                                    <div className="text-center form-outline mb-4">
                                        {errMsg !== "" && (
                                            <div className="field-err">{errMsg}</div>
                                        )}
                                    </div>
                                    <div className="text-center ">
                                        <a onClick={() => {
                                            setInvite(false)
                                            resetData()
                                        }}
                                            className="text-primary">
                                            Add from List
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </>
                    }
                </Popover >
            )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-fill-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
            </svg>
        </OverlayTrigger >
    )
}

export default AddContactPopover