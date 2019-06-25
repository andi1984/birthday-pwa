import React, { Fragment, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import FutureView from './FutureView'
import PastView from './PastView'

const Time = styled.time`
    font-family: monospace;
`
const Description = styled.p`
    text-align: center;
    font-weight: bold;
`

const Event = ({ title, description, date }) => {
    const dateInMomentFormat = moment(date)
    const [isDateInFuture, setIsDateInFuture] = useState(
        moment().diff(dateInMomentFormat) < 0
    )
    return (
        <Fragment>
            <h1>{title}</h1>
            <Description>
                {description}
                {isDateInFuture && (
                    <Fragment>
                        <br />
                        Beginn ist um{' '}
                        <Time>
                            {dateInMomentFormat.local().format('HH:mm')} Uhr
                        </Time>
                    </Fragment>
                )}
            </Description>
            {isDateInFuture ? (
                <FutureView
                    momentDate={dateInMomentFormat}
                    onPassed={() => setIsDateInFuture(false)}
                />
            ) : (
                <PastView momentDate={dateInMomentFormat} />
            )}
        </Fragment>
    )
}

export default Event
