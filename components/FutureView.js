import React, { Fragment } from 'react'
import Countdown from 'react-countdown-now'
import Calendar from 'rc-calendar'
import germanLocale from 'rc-calendar/lib/locale/de_DE'
import 'rc-calendar/assets/index.css'

const FutureView = ({ momentDate, onPassed }) => (
    <Countdown
        date={momentDate.toDate()}
        renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
                if (!!onPassed && typeof onPassed === 'function') {
                    onPassed()
                }
                return null
            }
            return (
                <Fragment>
                    <Calendar
                        locale={germanLocale}
                        disabledDate={moment => !moment.isSame(momentDate)}
                        showDateInput={false}
                        showToday={false}
                        showOk={false}
                        mode={'time'}
                        value={momentDate}
                    />
                    <p>
                        {' '}
                        Noch{' '}
                        <span className="days">
                            {!!days && `${days} Tag${days > 1 ? 'e' : ''}`}
                        </span>
                        {!!days && !!hours && ' und '}
                        <span className="hours">
                            {!!hours &&
                                `${hours} Stunde${hours > 1 ? 'n' : ''}`}
                        </span>
                        {(!!days || !!hours) && !!minutes && ' und '}
                        <span className="minutes">
                            {!!minutes &&
                                `${minutes} Minute${minutes > 1 ? 'n' : ''}`}
                        </span>
                        {!days && !hours && !minutes && (
                            <span className="minutes">
                                {!!seconds &&
                                    `${seconds} Sekunde${
                                        seconds > 1 ? 'n' : ''
                                    }`}
                            </span>
                        )}
                    </p>
                </Fragment>
            )
        }}
    />
)

export default FutureView
