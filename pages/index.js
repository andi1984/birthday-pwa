import React from 'react'
import { withRouter } from 'next/router'
import Event from '../components/Event'
import { getEventDataByEventQueryParam } from '../helper/event'
import eventData from '../data/data.json'
const Home = ({ router }) => {
    let eventID, event
    if ('id' in router.query) {
        eventID = router.query.id
        event = getEventDataByEventQueryParam(eventID, eventData)
    }

    return (
        <main>{!!event ? <Event {...event} /> : <p>Ungültiger Link</p>}</main>
    )
}

export default withRouter(Home)
