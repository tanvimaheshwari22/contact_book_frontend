import React from 'react'
import Webcam from 'react-webcam'

const videoConstraints = {
    height: 400,
    facingMode: 'user',
}

const CaptureImage = (props) => {
    return (
        <div >
            <div>
                {props.picture == '' ? (
                    <Webcam
                        className='webcam'
                        audio={false}
                        height={400}
                        ref={props.webcamRef}
                        screenshotFormat="image/png"
                        videoConstraints={videoConstraints}
                    />
                ) : (
                    <img src={props.picture} />
                )}
            </div>
        </div>
    )
}

export default CaptureImage