import React, { Fragment, useState } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { PageHeader, Divider } from 'antd'
import FutureView from './FutureView'
import PastView from './PastView'
import ImagePreview from './ImagePreview'

const Time = styled.time`
    font-family: monospace;
`
const Description = styled.p`
    text-align: center;
    font-size: 1em;
`

const Event = ({ title, description, date }) => {
    const dateInMomentFormat = moment(date)
    const [isDateInFuture, setIsDateInFuture] = useState(
        moment().diff(dateInMomentFormat) < 0
    )
    
    return (
        <Fragment>
            <PageHeader title={<h1>{title}</h1>} />
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
            <Divider orientation="left">Erinnerungen</Divider>
            <ImagePreview />
        </Fragment>
    )
}

export default Event
