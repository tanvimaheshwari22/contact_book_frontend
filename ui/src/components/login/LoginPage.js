import { useState } from 'react';
import './login.css';
import { loginUser } from '../../service/userSvc';
import { useNavigate } from 'react-router';
import Button from '../layout/button';
import React from "react"
import { useForm } from 'react-hook-form';
import { phoneRegex } from './RegistrationPage';
import '../../App.css'

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const { register, handleSubmit, getValues, setValue, formState: { errors },
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: {
            mobileNumber: '',
            password: '',
        }
    });
    let navigate = useNavigate();

    const resetData = async () => {
        setValue('password', '');
        setValue('mobileNumber', '');
    };

    const onSave = async () => {
        try {
            setIsLoading(true);
            const res = await loginUser(getValues('mobileNumber'), getValues('password'))
            if (res.data.isVerified) {
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                localStorage.setItem("user", JSON.stringify(res.data.data));
                navigate("/");
            } else {
                throw new Error();
            }
        } catch (error) {
            setErrMsg(error?.response?.data?.msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <div className="login-top" />
            <div className="login-box">
                <div className='text-center'>
                    <h1>Login Form</h1>
                </div>
                <form autoComplete="on" onSubmit={handleSubmit(onSave)}>
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

                    <div className="text-center pt-1 mb-5 pb-1">
                        <Button
                            btnColor="btn-dark"
                            label="Login"
                            isLoading={isLoading}
                        />
                    </div>
                    <div className="text-center form-outline mb-4">
                        {errMsg !== "" && (
                            <div className="text text-danger">{errMsg}</div>
                        )}
                    </div>
                    <div className="text-center form-outline mb-4">
                        Don't have an account?
                        <a href="/registration" className="text-primary" onClick={resetData}>
                            Create an account
                        </a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage