import React, { useEffect, useState } from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import ReactSelect, { components } from "react-select";
import Button from "../layout/button";
import { createGroup, getGroups, userContacts } from "../../service/userSvc";
import { useForm } from "react-hook-form";

const Option = (props) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                />
                <label>{props.label}</label>
            </components.Option>
        </div>
    );
};

const CreateGroupPopover = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [contactList, setContactList] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const [selectedOptions, setSelectedOptions] = useState(null)
    let memberId = []
    const { register, handleSubmit, getValues, setValue, formState: { errors },
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onSubmit",
        defaultValues: {
            groupName: '',
            memberId: [],
        }
    });

    const onCreate = async () => {
        try {
            setIsLoading(true);
            await createGroup(getValues('groupName'), getValues('memberId'))
            window.location.reload();
            return
        } catch (error) {
            setErrMsg(error?.response?.data?.msg);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await userContacts(props.userId);
            const res = await getGroups()
            setContactList(response.data.data);
        } catch (err) {
            setErrMsg(err)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const contactOptions = contactList.map(c => {
        return { value: c.contact_user_id, label: `${c.first_name} ${c.last_name} : ${c.mobile_number}` }
    })

    const handleChange = (selected) => {
        setSelectedOptions(selected)
        selected.map(s => {
            if (s.value) {
                memberId.push(s.value)
                setValue('memberId', memberId)
            }
        })
    };

    return (
        <OverlayTrigger
            placement="bottom"
            trigger="click"
            rootClose
            overlay={(
                <Popover>
                    <div className="contact-form-box">
                        <div className='text-center'>
                            <h4>Create Group</h4>
                        </div>
                        <form autoComplete="on" onSubmit={handleSubmit(onCreate)} >
                            <div className="form-group">
                                <label>Group Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("groupName", {
                                        required: "Group Name Required",
                                    })}
                                />
                                {errors.groupName && (
                                    <div className="field-err">
                                        {errors.groupName.message}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Add Members</label>
                                <br></br>

                                <span
                                    style={{ width: "280px" }}
                                    className="d-inline-block"
                                    data-toggle="popover"
                                    data-trigger="focus"
                                    data-content="Please selecet account(s)"
                                >
                                    <ReactSelect
                                        options={contactOptions}
                                        isMulti
                                        closeMenuOnSelect={false}
                                        hideSelectedOptions={false}
                                        components={{
                                            Option
                                        }}
                                        onChange={handleChange}
                                        value={selectedOptions}
                                    />
                                </span>
                            </div>
                            <div className="text-center pt-1 mb-5 pb-1">
                                <Button
                                    btnColor="btn-dark"
                                    label="Create"
                                    isLoading={isLoading}
                                />
                            </div>
                            <div className="text-center form-outline mb-4">
                                {errMsg !== "" && (
                                    <div className="text text-danger">{errMsg}</div>
                                )}
                            </div>
                        </form>
                    </div>
                </Popover >
            )}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            </svg>
        </OverlayTrigger >
    )
}

export default CreateGroupPopover