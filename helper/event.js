/**
 * @param {string} eventId
 * @param {Object} allEventData
 * @returns {Object}
 */
export const getEventDataByEventQueryParam = (eventId, eventData) => {
    return eventData.events.find(event => {
        return event.id === eventId;
    })
}

export default { getEventDataByEventQueryParam }
