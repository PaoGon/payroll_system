import React from 'react'
import {Button} from './Button'
import {BiSend} from 'react-icons/bi'
import {FaRegUserCircle} from 'react-icons/fa'

function Payroll() {
    return (
        <div className='payroll'>
            <div className="head">
                <h1>Payroll</h1>
                <div className="wrap">
                    <Button buttonColor='blue' onClick={() => ''}>
                        <BiSend/>
                        Submit
                    </Button>
                </div>
            </div>
            <div className="form">
                <div className="pay_cont">
                    <div className="inf">
                        <div className="gg">
                            <FaRegUserCircle/>
                        </div>
                        <div className="details pos">
                            <p>name</p>
                            <p>ID</p>
                            <p>position</p>
                        </div>
                    </div>
                    <div className="int"></div>
                    <div className="fields"></div>
                </div>
            </div>
            <div className="np">
                <Button buttonColor='gray' onClick={() => ''}>
                    Previous 
                </Button>
                <Button buttonColor='blue' onClick={() => ''}>
                    Next
                </Button>
            </div>
            
        </div>
    )
}

export default Payroll