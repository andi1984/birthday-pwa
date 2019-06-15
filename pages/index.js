import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import Event from '../components/Event'
import { getEventDataByEventQueryParam } from '../helper/event'
import eventData from '../data/data.json'
const Home = () => {
    const [event, setEvent] = useState(null)
    useEffect(() => {
        const query = queryString.parse(window.location.search)
        if ('id' in query) {
            setEvent(getEventDataByEventQueryParam(query.id, eventData))
        }
    }, [])

    return (
        <main>{!!event ? <Event {...event} /> : <p>Ungültiger Link</p>}</main>
    )
}

export default Home
