import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

function EmpPayslip({ payData, fixed_rate}) {
    const [trigger, setTrigger] = useState(true)
    const [payslip, setPayslip] = useState([])
    const [render, setRender] = useState(false)

    useEffect(() => {
       setRender(true)
    }, [payslip])

    const getDate = (date) => {
        let output = date.split('T')
        let created = output[0]
        return created
    } 
    return (
        <div className='payslip-cont'>
            <div className="pay-head">
                <h1>Payslip</h1>
            </div>

            <div className="data">
                <div className="con">
                    <div className="testing">
                        
                        {payData.map((val, key) => {
                            return(
                                <div className='pay-card sett' key={key}>
                                    <div className="pay-title">
                                        <h1>{getDate(val.date_created)}</h1>
                                    </div>
                                    <div className="heading">
                                        <p>Earnings</p>
                                        <p>Deductions</p>
                                    </div>
                                    <div className="card-info">
                                        <div className="col1">
                                            <div className="tit">
                                                <p>Pay Element</p>
                                                <p>Amount</p>
                                            </div>
                                            <div className="col-data1">
                                                <div className="earnigs">
                                                    <p>Employee Base</p>
                                                    <p>Over Time</p>
                                                    <p>Allowances</p>
                                                    <p>Holiday Pay</p> 
                                                
                                                </div>
                                                <div className="amount2">
                                                    <p>{fixed_rate}</p>
                                                    <p>*</p>
                                                    <p>{val.allowances}</p>
                                                    <p>{val.holiday_pay}</p>
                                                </div>
                                            </div>

                                            <div className="gross">
                                                {trigger ?(
                                                    setPayslip(val.payslip),
                                                    setTrigger(false)
                                                )       
                                                : ''}
                                                <div className="earnigs">
                                                    <p>Gross Pay</p>
                                                </div>
                                                {render ? 
                                                    payslip.map((val, key) => {
                                                        return(
                                                            <div className="gross-amount" key={key}>
                                                                <p >{val.gross_salary}</p>
                                                            </div>
                                                        )
                                                    })
                                                : ''}
                                            </div>

                                        </div>
                                        <div className="col1">
                                            <div className="tit">
                                                <p>Pay Element</p>
                                                <p>Amount</p>
                                            </div>
                                            <div className="col-data1">
                                                <div className="earnings">
                                                    <div className='pay-inf'>
                                                        <p>Modified Pag-IBIG II</p>
                                                        <p className='d'>{val.mp2}</p>
                                                    </div>
                                                    <div className="pay-inf">
                                                        <p >HDMF Loan</p>
                                                        <p className='d'>{val.hdmf_loan}</p>  
                                                    </div>
                                                    
                                                    <div className="pay-inf">
                                                        <p>SSS Loan</p>
                                                        <p className='d'>{val.sss_loan}</p>
                                                    </div>
                                                    <div className="pay-inf">
                                                        <p>PhilHealth Share</p>
                                                        <p>{val.philhealth_ee_share}</p>
                                                    </div>
                                                    <div className="pay-inf">
                                                        <p>pag-ibig share</p>
                                                        <p>{val.pagibig_ee_share}</p>
                                                    </div>
                                                    <div className="pay-inf">
                                                        <p>SSS Share</p>
                                                        <p>{val.sss_ee_share}</p>
                                                    </div>
                                                    <div className="pay-inf">
                                                        <p>Cash Advance</p>
                                                        <p>{val.cash_advance}</p>
                                                    </div>
                                                    <div className="pay-inf">
                                                        <p>Absenses</p>
                                                        <p>*</p>
                                                    </div>
                                                    <div className="pay-inf">
                                                        <p>Late/Undertime</p>
                                                        <p>*</p>
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>

                                            <div className="deduct">
                                                <div className="earnings">
                                                    {payslip.map((val, key) => {
                                                        return(
                                                            <div className='pay-inf' key={key}>
                                                                <p>Total Deductions</p>
                                                                <p className='deduct-amount'>{val.deduction}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="net-pay">
                                        <div className="y"/>
                                        <div className="x">
                                            {payslip.map((val, key) =>{
                                                return(
                                                    <div className="pay-inf" key={key}>
                                                        <p>Net Pay</p>
                                                        <p className="net-amount">{val.net_pay}</p>
                                                    </div>

                                                )
                                            })}
                                        </div>

                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
     
            </div>
        
        </div>
    )
}

const mapStateToProps = state => ({
    payData: state.profile.payroll,
    fixed_rate: state.profile.fixed_rate
})

export default connect(mapStateToProps)(EmpPayslip)
