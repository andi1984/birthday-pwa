import React, { Fragment, useState } from 'react'
import Countdown from 'react-countdown-now'
import Calendar from 'rc-calendar'
import Dropzone from 'react-dropzone'
import germanLocale from 'rc-calendar/lib/locale/de_DE'
import 'rc-calendar/assets/index.css'
import moment from 'moment'
import * as Sentry from '@sentry/browser'

const Event = ({ title, date }) => {
    const dateInMomentFormat = moment(date)
    const [image, setImage] = useState(null)
    return (
        <Fragment>
            <h1>{title}</h1>
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
                                <span className="days">
                                    {!!days &&
                                        `${days} Tag${days > 1 ? 'e' : ''}`}
                                </span>{' '}
                                <span className="hours">
                                    {!!hours &&
                                        `${hours} Stunde${
                                            hours > 1 ? 'n' : ''
                                        }`}
                                </span>{' '}
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
            <Dropzone
                onDrop={acceptedFiles => {
                    acceptedFiles.forEach(file => {
                        const reader = new FileReader()

                        reader.onabort = () =>
                            console.log('file reading was aborted')
                        reader.onerror = Sentry.captureException
                        reader.onload = () => {
                            // Do whatever you want with the file contents
                            const blob = new Blob([reader.result], {
                                type: file.type,
                            })
                            setImage(blob)
                        }
                        reader.readAsArrayBuffer(file)
                    })
                }}
            >
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()}>
                            <input
                                aria-label="Hochladen"
                                {...getInputProps()}
                            />
                            <p>
                                Drag 'n' drop some files here, or click to
                                select files
                            </p>
                        </div>
                    </section>
                )}
            </Dropzone>
            {!!image && <img alt="Vorschau" src={URL.createObjectURL(image)} />}
            {!!image && (
                <button
                    type="button"
                    onClick={() => {
                        var formData = new FormData()
                        formData.append('image', image)
                        fetch(
                            'http://localhost:34567/.netlify/functions/send',
                            {
                                method: 'POST',
                                body: formData,
                                // headers: {
                                //     'Content-Type':
                                //         'multipart/form-data; charset=utf-8; boundary="another cool boundary"',
                                // },
                            }
                        )
                    }}
                >
                    Hochladen
                </button>
            )}
        </Fragment>
    )
}

export default Event
