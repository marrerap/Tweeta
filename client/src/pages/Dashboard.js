import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Dashboard() {
const [ tweets, setTweets] = useState([])
const { user, checked } = useSelector(state => state.user)



    useEffect(() => {
        fetch('/api/v1/tweets')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTweets(data)
        })
    }, [])

if(!checked) {
    return 'loading...'
}
    return (
       
        <div>
             {user && (
                 <div>Form</div>
             )}
           Dashboard!!!
           {tweets.map((tweet, index) => {
               return(
                <div key={tweet.id} >{tweet.content}</div>
               )
           })}

        </div>
    )
}

export default Dashboard
