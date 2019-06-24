import React, { Fragment, useState } from 'react'
import Countdown from 'react-countdown-now'
import Calendar from 'rc-calendar'
import Dropzone from 'react-dropzone'
import germanLocale from 'rc-calendar/lib/locale/de_DE'
import 'rc-calendar/assets/index.css'
import moment from 'moment'
import * as Sentry from '@sentry/browser'
import axios from 'axios'
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
    const [image, setImage] = useState(null)
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
            <input
                type="file"
                name="image"
                onChange={e => {
                    console.log(e.target.files[0])
                    setImage(e.target.files[0])
                }}
            />
            {!!image && <img alt="Vorschau" src={URL.createObjectURL(image)} />}
            {!!image && (
                <button
                    type="button"
                    onClick={() => {
                        var formData = new FormData()
                        formData.append('image', image)
                        axios
                            .post('http://localhost:1222/upload', formData)
                            .then(res => console.log(res.statusText))
                    }}
                >
                    Hochladen
                </button>
            )}
        </Fragment>
    )
}

export default Event
