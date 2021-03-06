import React from 'react'
import {Button} from './Button'
import {FaTimes} from 'react-icons/fa'
import {BiSend} from 'react-icons/bi'

export default function Popup(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <h1>{props.title}</h1>
                <div className="form">
                    {props.children}
                </div>
                
                <div className="pos">
                    <Button buttonColor='blue' onClick={() => props.click()}>
                        <BiSend/>
                        Submit
                    </Button>
                    <Button buttonColor='gray' onClick={() => props.setTrigger(false)}>
                        <FaTimes/>cancel
                    </Button>
                </div> 
                
            </div>
        </div>
    ) : "";
}

