import React, { useState } from "react"
import './dashboard.css'
import ChooseProfile from "../login/ChooseProfile"
import Button from "../layout/button"
import { useForm } from "react-hook-form"
import { emailRegex } from "../login/RegistrationPage"
import { updateUser } from "../../service/userSvc"

const UserProfile = (prop) => {
    const [update, setUpdate] = useState(false)
    const [preview, setPreview] = useState(prop.picture)

    const currentUser = prop.currentUser[0]
    const { register, getValues,
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: {
            firstName: currentUser.first_name,
            lastName: currentUser.last_name,
            email: currentUser.email,
            picture: currentUser.picture,
            password: currentUser.password
        }
    });

    const onUpdate = async () => {
        try {
            prop.setIsLoading(true)
            await updateUser({
                email: getValues('email'),
                password: getValues('password'),
                first_name: getValues('firstName'),
                last_name: getValues('lastName'),
                picture: preview,
                mobileNumber: currentUser.mobile_number
            })
            prop.setPicture(preview)
        } catch (error) {
            console.log(error);
        } finally {
            setUpdate(false)
            prop.setIsLoading(false)
        }
    }

    if (prop.isLoading) {
        return (
            <div className='rightside'>
                <div className="loader">
                    <div className="spinner-border" role="status">
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {!update &&
                <>
                    <div className='user-profile'>
                        {!prop.picture &&
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                            </svg>
                        }
                        {prop.picture &&
                            <img src={preview} width={150} height={150} />
                        }
                    </div>
                    <div className="user-name">{prop.user.name}</div>
                    <div className="update-btn" onClick={() => setUpdate(true)}>
                        <Button
                            btnColor="btn-dark"
                            label="Update"
                        />
                    </div>
                </>
            }
            {update &&
                <>
                    <div style={{ height: "calc(100% - 60px)" }}>
                        <ChooseProfile preview={preview} setPreview={setPreview} />
                        <div className="user-name">{prop.user.name}</div>
                        <form autoComplete="on" >
                            <div className="form-group ms-2 me-2">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    aria-label="FirstName"
                                    {...register("firstName", {
                                        required: "First Name Required",
                                    })}
                                />
                            </div>
                            <div className="form-group ms-2 me-2">
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
                            </div>
                            <div className="form-group ms-2 me-2">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    {...register("password", {
                                        required: "Password Required",
                                    })}
                                />
                            </div>
                            <div className="form-group ms-2 me-2">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    autoComplete="off"
                                    aria-label="Email Address"
                                    {...register("email", {
                                        required: true,
                                        validate: (v) => {
                                            if (!emailRegex.test(v)) {
                                                return (
                                                    "Enter Valid Email"
                                                );
                                            }
                                            return true;
                                        }
                                    })}
                                />
                            </div>
                        </form>
                        <div className="cancel-btn" onClick={() => setUpdate(false)}>
                            <Button
                                btnColor="btn-Light"
                                label="Cancel"
                            />
                        </div>
                        <div className="update-btn" onClick={onUpdate}>
                            <Button
                                btnColor="btn-success"
                                label="Confirm"
                            />
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default UserProfile