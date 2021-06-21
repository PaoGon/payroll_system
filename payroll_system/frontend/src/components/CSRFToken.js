import React, { useState, useEffect } from 'react'



const CSRFToken = () => {
    const [csrftoken, setcsrftoken] = useState('')

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    useEffect(() => {
        const fetch_data = async () => {
            try{
                const res = await fetch('/api/csrf_cookie')

            }catch (err){
                console.error(err)
            }
                
        }

        fetch_data();
        setcsrftoken(getCookie('csrftoken'))
    })

    return (
        <input type='hidden' name='csrfmiddlewaretoken' value={csrftoken}/>
    )
}

export default CSRFToken