import React, {useState} from 'react'

const Popup = () => {
    const [buttonPopup, setButtonPopup] = useState(true);
    return (buttonPopup)?(
        <div className="popup">
            <div className="popup-inner">
            <h2>Using this app you are agreeing to the privacy rules of GDPR</h2>
            <h3>For further reading, please see 
            <a href="https://www.imy.se/en/"> this website</a>
            </h3>
                <button className="close-button" onClick={() => setButtonPopup(false)}>Got it</button>
                
            </div>

        </div>
    ):(
        
        window.location.hash="main"
    )
}

export default Popup

