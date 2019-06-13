import { getEventDataByEventQueryParam } from './event'

const mockData = {
    events: [
        {
            date: 'July 9, 1984 19:00:00',
        },
        {
            date: 'July 8, 1984 19:00:00',
        },
        {
            date: 'July 8, 1984 18:00:00',
        },
    ],
}
describe('getEventDataByEventQueryParam', () => {
    test('It returns correct date object', () => {
        expect(getEventDataByEventQueryParam('458150400000', mockData)).toEqual(
            {
                date: 'July 8, 1984 18:00:00',
            }
        )
    })
})
