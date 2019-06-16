/**
 * @param {string} eventId
 * @param {Object} allEventData
 * @returns {Object}
 */
export const getEventDataByEventQueryParam = (eventId, allEventData) => {
    return allEventData.events.find(event => {
        const eventTimeSinceUnixEpoche = new Date(event.date).getTime()
        return eventTimeSinceUnixEpoche.toString() === eventId
    })
}

export default { getEventDataByEventQueryParam }
