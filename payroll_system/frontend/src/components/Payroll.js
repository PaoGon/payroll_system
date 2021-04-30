import React,{useState} from 'react'
import {Button} from './Button'
import {BiSend} from 'react-icons/bi'
import {FaRegUserCircle} from 'react-icons/fa'

function Payroll() {
    const [page, setPage] = useState();
    const [render1, setRender1] = useState(false);
    const [get, setGet] = useState(false);
    const [duo, setDuo] = useState(false);
    const [prev, setPrev] = useState(false);
    const [next, setNext] = useState(true);
    const [num, setNum] = useState({page : 1})
    let num1 = 1;

    function getForm(page_num){
        fetch(`/api/payroll-list?page=${page_num}`)
        .then((response)=>response.json())
        .then((data) => setPage(data))
        .then(() => setRender1(true))
        .then(() => setGet(false))
        // .then(() => setDuo(false))
        .catch(err => console.log(err));
    }
    window.onload = () => getForm(num.page);

    // function getResult(){
    //     const object = page;
    //     const res = object.results
    //     setData(res);
    //     setDuo(true);
    // }

    function previous(){
        if(num.page <= 1){
            setPrev(false)
            setDuo(false)
        }
        else{
            setPrev(true)
        }
        if(page.count == num.page){
            setDuo(false)
            setNext(false)
        }
        else{
            setNext(true)
        }
    }

    function next_page(){
        // getForm(num1)
        previous()
        setGet(true)
        console.log(num.page)
    }

    function inc_page_num(){
        // num1 += 1
        setNum({
            page : num.page += 1
        })
        next_page()
    }

    function dec_page_num(){
        // num.page -= 1
        setNum({
            page : num.page -= 1
        })
        next_page()
    }

    return (
        <div className='co'>
            {/* {duo ? previous() :''} */}
            {get ? getForm(num.page) : ''}
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
                    {prev ? 
                        <Button buttonColor='gray' onClick={() => dec_page_num()}>
                            Previous
                        </Button>  
                    : ''}
                    
                    {next ? 
                        <Button buttonColor='blue' onClick={() => inc_page_num()}>
                        Next
                        </Button>
                    :''}
                    
                </div>
                
            </div>
        </div>
        
    )
}

export default Payroll