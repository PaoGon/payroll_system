import React,{  useState, useEffect  } from 'react'
import Cookies from 'js-cookie'
import { Button } from './Button'
import { connect } from 'react-redux'

function Attendance({id}) {
    let time = new Date()
    
    const [currentDate, setCurrentDate] = useState('')
    const [attendanceId, setAttendanceId] = useState('')
    const [trigger, setTrigger] = useState(false)
    const [absent, setAbsent] = useState(false)
    const [late, setLate] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    
    const post_attendance = async () =>{
        
        
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
                
            },
            body: JSON.stringify({
                "employee": id,
                "late": late,
                "absent": absent
            }),
            cache: "no-cache"
        };

        try {
            const res = await fetch("/api/emp-attendance", requestOptions)
            const data = await res.json()
            
            if (data.success){
                setTrigger(false)
                setAttendanceId(data.id)
                console.log(data.success) 
                console.log(data.id)
            } else{
                console.log(data.error)
            }
            // console.log(data    )
        } catch(err) {
            console.log(err)
        };


    };
    
    const timeOut = async (data) => {

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get('csrftoken')
                
            },
            body: JSON.stringify({
                "time_out": data
            }),
            cache: "no-cache"
        };

        
       try{ 
            
            const res = await fetch(`/api/emp-timeout?id=${attendanceId}`, requestOptions)
            const data = await res.json()

            if(data.success){
                console.log('trig value: ', trigger)
                console.log(data.success)
            } else{
                console.log(data.invalid)
            }
            
       } catch(err){
            console.log(err)
       }  

    }


    useEffect(() => {

        if(trigger){
            post_attendance()
        }

    }, [late, absent]) 

    
    const onSubmit = e => {
        e.preventDefault()
        // post_attendance()
    }
        
    const disable = () => {
                
        setIsDisabled(false)
        
        
        setTimeout(() => {
            setIsDisabled(true)
            setAbsent(false)
            setLate(false)
        }, 300000)
    }
    
    
    const formatAMPM = () => {
        
        let hour = time.getHours();
        let mins = time.getMinutes();
        let seconds = time.getSeconds();
        
        let current_time = hour.toString() + ':' + mins.toString() + ':' + seconds.toString()
        
        console.log('testing: ',current_time)
        return current_time;
    }


    const getTime = () => {
        
        time = formatAMPM()
        console.log('una:',time)

        if(time != '8:00'){
            console.log('late: ', true)
            setLate(true)
            setTrigger(true)
        }
        
        disable()

    } 
    
    
    const getCurrentDate = () => {
        let cur_time = formatAMPM()
        let date = time.getDate();
        let month = time.getMonth() + 1;
        let year = time.getFullYear();
        
        let current_date = year.toString() + '-' + month.toString() + '-' + date.toString() 

        let exact_time = current_date + 'T' + cur_time + '.' + '10Z'
        console.log(exact_time)
        // console.log(time.setUTCDate)
        // setCurrentDate(current_date)
        timeOut(exact_time)
    }

    return (
        <>
            <div className='conttt'>
                <form className="btn-cont" onSubmit={e => onSubmit(e)}>
                
                    <Button buttonColor='green' buttonSize='btn-mobile' type='submit' onClick={getTime} disable={!isDisabled ? true : '' }>
                        Time In
                    </Button>
            
                    <Button buttonColor='orange' type='submit' buttonSize='btn-mobile' disable={isDisabled ? true : ''} onClick={() => getCurrentDate()}>
                        Time Out
                    </Button>

                    <Button buttonColor='red' type='submit' buttonSize='btn-mobile' onClick={() => {
                        setAbsent(true)
                        setTrigger(true)
                        disable()
                    }
                    } disable={!isDisabled ? true : '' }>
                        Absent
                    </Button>
                    

                </form>
            </div>
        
        </>
    )
}

const mapStateToProps = state => ({
    id: state.profile.id
})


export default connect(mapStateToProps, {})(Attendance)