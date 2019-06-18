/**
 * @param {string} eventId
 * @param {Object} eventData
 * @returns {boolean}
 */
export const getEventDataByEventQueryParam = (eventId, eventData) => {
    return eventData.events.find(event => {
        return event.id === eventId;
    })
}
export default {}
