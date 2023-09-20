import React from "react"

const Button = (props) => {
    return (
        <>
            {!props.isLoading ? (
                <button type="submit" className={`btn ${props.btnColor}`} disabled={props.disabled} onClick={props.handleClick}>
                    {props.label}
                </button>
            ) : (
                <button type="submit" className={`btn ${props.btnColor}`}>
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                    ></span>
                </button>
            )}
        </>
    );
};

export default Button;