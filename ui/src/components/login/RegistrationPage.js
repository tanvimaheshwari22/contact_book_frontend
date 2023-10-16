import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { registerUser } from '../../service/userSvc';
import Button from '../layout/button';
import './login.css';
import '../../App.css'
import ChooseProfile from './ChooseProfile';

export const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
export const phoneRegex = /^([+]\d{2})?\d{10}$/

const RegistrationPage = () => {
    const [preview, setPreview] = useState(null)
    const { register, handleSubmit, getValues, formState: { errors },
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: {
            mobileNumber: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: '',
            picture: ''
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    let navigate = useNavigate();

    const onRegister = async () => {
        try {
            setIsLoading(true)
            const res = await registerUser({
                mobile_number: getValues('mobileNumber'),
                email: getValues('email'),
                password: getValues('password'),
                first_name: getValues('firstName'),
                last_name: getValues('lastName'),
                gender: getValues('gender'),
                picture: preview
            })
            if (res.data.success) {
                navigate("/login");
            } else {
                throw new Error();
            }
        } catch (error) {
            setErrMsg(error?.response?.data?.msg);
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="login-top" />
            <div className="registration-box">
                <div className='text-center'>
                    <h1>Registration Form</h1>
                </div>
                <form autoComplete="on" onSubmit={handleSubmit(onRegister)}>
                    <div className='d-flex flex-row'>
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
                        <div className="form-group ms-2">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                {...register("password", {
                                    required: "Password Required",
                                })}
                            />
                            {errors.password && (
                                <div className="field-err">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='d-flex flex-row'>
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
                        <div className="form-group ms-2">
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
                    </div>
                    <div className='d-flex flex-row'>
                        <div className="form-group">
                            <label>Email Address</label>

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
                            {errors.email && (
                                <div className="field-err">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>

                        <div className="form-group ms-2" style={{ width: "240px" }}>
                            <label>Gender</label>
                            <br></br>
                            <select
                                className="form-select mb-2"
                                aria-label="Gender"
                                {...register("gender", {
                                    required: true,
                                })}
                            >
                                <option defaultValue={""} />
                                <option value="F">Female</option>
                                <option value="M">Male</option>
                            </select>
                            {errors.gender && (
                                <div className="field-err">
                                    {errors.gender.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <ChooseProfile preview={preview} setPreview={setPreview} />
                    <div className="text-center pt-1 pb-1">
                        <Button
                            btnColor="btn-dark"
                            label="Register"
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="text-center form-outline mb-4">
                        {errMsg !== "" && (
                            <div className="field-err">{errMsg}</div>
                        )}
                    </div>
                    <div className="text-center form-outline mb-4">
                        already registered?
                        <a href="/login" className="text-primary">Login</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage