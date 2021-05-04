import React,{useState} from 'react'
import {Button} from './Button'
import {BiSend} from 'react-icons/bi'
import {FaRegUserCircle} from 'react-icons/fa'

function Payroll() {

    // *stores GET data from the API
    const [page, setPage] = useState();

    // !triggers the render of the form
    const [render1, setRender1] = useState(false);

    // !triggers the get request
    const [get, setGet] = useState(false);

    // *check the state of previous button
    const [prev, setPrev] = useState(false);

    // *check the state of next button
    const [next, setNext] = useState(true);

    // *stores the value of current page
    const [num, setNum] = useState({page : 1})

    // ?hundles the GET request
    function getForm(page_num){
        fetch(`/api/payroll-list?page=${page_num}`)
        .then((response)=>response.json())
        .then((data) => setPage(data))
        .then(() => setRender1(true))
        .then(() => setGet(false))
        .catch(err => console.log(err));
    }

    // ?check the page number
    function previous(){
        if(num.page <= 1){
            setPrev(false)
        }
        else{
            setPrev(true)
        }
        if(page.count == num.page){
            setNext(false)
        }
        else{
            setNext(true)
        }
    }

    // ?triggers the state for the GET request 
    function next_page(){
        previous()
        setGet(true)
        console.log(num.page)
    }

    // ?increment the value of the page number state
    function inc_page_num(){
        setNum({
            page : num.page += 1
        })
        next_page()
    }

    // ?decrement the value of the page number state
    function dec_page_num(){
        setNum({
            page : num.page -= 1
        })
        next_page()
    }

    // ?activate the GET request when the page loaded
    window.onload = () => getForm(num.page);

    return (
        <div className='payroll'>
            {/* activates the GET request */}
            {get ? getForm(num.page) : ''}
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
                {render1 ? page.results.map((val, key) =>{
                    return(
                        <div className="pay_cont" key={key}>
                        <div className="inf">
                            <div className="gg">
                                <FaRegUserCircle/>
                            </div> 
                            <div className="details pos s">
                                <div className="pdetails">
                                    <p>{val.name}</p>
                                    <p>{val.surname}</p>
                                </div>
                                
                                {val.position}
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
                    </div>);
                }) : ''}
            </div>
            <div className="np">
                <Button buttonColor='gray' onClick={prev ? () => dec_page_num() : () => ''}>
                    Previous
                </Button>  
                    
                <Button buttonColor='blue' onClick={next ? () => inc_page_num(): () => ''}>
                    Next
                </Button>
                
            </div>
            
        </div>

        
    )
}

export default Payroll