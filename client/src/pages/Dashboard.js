import React, { useEffect, useState } from 'react'

function Dashboard() {
const [ tweets, setTweets] = useState([])


    useEffect(() => {
        fetch('/api/v1/tweets')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTweets(data)
        })
    }, [])

    return (
        <div>
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
