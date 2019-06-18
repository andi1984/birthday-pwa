import React, { Fragment } from 'react'
import Countdown from 'react-countdown-now'
import Calendar from 'rc-calendar'
import germanLocale from 'rc-calendar/lib/locale/de_DE'
import 'rc-calendar/assets/index.css'
import moment from 'moment'
import styled from 'styled-components'

const Time = styled.time`
    font-family: monospace;
`
const Description = styled.p`
    text-align: center;
    font-weight: bold;
`

const Event = ({ title, description, date }) => {
    const dateInMomentFormat = moment(date)
    return (
        <Fragment>
            <h1>{title}</h1>
            <Description>
                {description}
                <br />
                Beginn ist um{' '}
                <Time>{dateInMomentFormat.local().format('HH:mm')} Uhr</Time>
            </Description>

            <Calendar
                locale={germanLocale}
                disabledDate={moment => !moment.isSame(dateInMomentFormat)}
                showDateInput={false}
                showToday={false}
                showOk={false}
                mode={'time'}
                value={dateInMomentFormat}
            />
            <Countdown
                date={date}
                renderer={({ days, hours, minutes, completed }) => {
                    if (completed) {
                        return <p>Party 🎉</p>
                    } else {
                        return (
                            <p>
                                {' '}
                                Noch{' '}
                                <span className="days">
                                    {!!days &&
                                        `${days} Tag${days > 1 ? 'e' : ''}`}
                                </span>
                                {!!hours && ' und '}
                                <span className="hours">
                                    {!!hours &&
                                        `${hours} Stunde${
                                            hours > 1 ? 'n' : ''
                                        }`}
                                </span>
                                {!!minutes && ' und '}
                                <span className="minutes">
                                    {!!minutes &&
                                        `${minutes} Minute${
                                            minutes > 1 ? 'n' : ''
                                        }`}
                                </span>
                            </p>
                        )
                    }
                }}
            />
        </Fragment>
    )
}

export default Event
