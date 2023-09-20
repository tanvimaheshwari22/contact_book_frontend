import React from "react"
import './layout.css'

const ErrCallout = (props) => {
    return <div className="callout callout-danger">
        <h4>Error:</h4>
        {props?.error}
    </div>
}

export default ErrCallout