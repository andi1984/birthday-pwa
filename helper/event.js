/**
 * @param {string} eventId
 * @param {Object} eventData
 * @returns {boolean}
 */
export const getEventDataByEventQueryParam = (eventId, eventData) => {
    return eventData.events.find(event => {
        const eventTimeSinceUnixEpoche = new Date(event.date).getTime()
        return eventTimeSinceUnixEpoche.toString() === eventId
    })
}
export default {}
