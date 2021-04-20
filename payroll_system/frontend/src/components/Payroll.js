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
                        <div className="details pos s">
                            <p>name</p>
                            <p>ID</p>
                            <p>position</p>
                        </div>
                    </div>
                    <div className="int">
                        <p className='a'>Allowences</p>
                        <p className='a'>Bonus</p>
                        <p className='a'>Cash Advance</p>
                        <p className='a'>Holiday Pay</p>
                    </div>
                    <div className="fields">
                        <div className="field-cont1">
                            <div className="int1">
                                <input type="number"/>
                            </div>
                        </div>
                        <div className="field-cont1">
                            <div className="int1">
                                <input type="number"/>
                            </div>
                        </div>
                        <div className="field-cont1">
                            <div className="int1">
                                <input type="number"/>
                            </div>
                        </div>
                        <div className="field-cont2">
                            <div className="int1">
                                <input type="number"/>
                            </div>
                        </div>
                    </div>
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