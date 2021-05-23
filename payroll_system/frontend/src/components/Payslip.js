import React from 'react'
import {FaTimes} from 'react-icons/fa'
import {FaRegUserCircle} from 'react-icons/fa'

export default function Payslip(props) {
    return (props.review) ?(
        <div className='popup'>
          <div className="ext">
              <div className="popup-inner-search">
                <div className="ss" >
                    <h1>Payslip Review</h1>
                    <div className="exit" onClick={() => props.setReview(false)}><FaTimes/>
                    </div>  
                </div>
                <div className="div-table">
                  <div className="div-table-row">
                    <div className="div-table-col lab"></div>
                    <div className="div-table-col lab">Gross Salary</div>
                    <div className="div-table-col lab">Bonus</div>
                    <div className="div-table-col lab">Deduction</div>
                    <div className="div-table-col lab">Net Pay</div>
                  </div>
                </div>
                  {props.data.map((val, key) => {
                    return(
                      <div className='div-table-row info' key={key}>
                        {props.page.results.map((val, key) => {
                          return(
                            <div className="div-table-col icon" key={key}>
                              <FaRegUserCircle/>
                              <div className="pay-details pos s">
                                <div className="pdetails">
                                    <p>{val.name}</p>
                                    <p>{val.surname}</p>
                                </div>
                                
                                {val.position}
                            </div>
                            </div>
                          )
                        })}
                        <div className="div-table-col" >{val.gross_salary}</div>
                        <div className="div-table-col" >{val.total_bonus}</div>
                        <div className="div-table-col" >{val.deduction}</div>
                        <div className="div-table-col" >{val.net_pay}</div>
                      </div> 
                      
                    )
                  })}
              </div>
          </div>
        </div>
    ): '';
}
