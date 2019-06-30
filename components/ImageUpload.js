import React, { Fragment, useCallback, useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import styled from 'styled-components';

const Img = styled.img`
    height: auto;
    width: auto;
    max-width: 100%;
`;
const ImageUpload = () => {
    const [image, setImage] = useState(null)
    const onDrop = useCallback(acceptedFiles => {
        if (Array.isArray(acceptedFiles) && acceptedFiles.length > 0) {
            setImage(acceptedFiles[0])
        }
    }, [])

    return (
        <Fragment>
            <Dropzone multiple={false} onDrop={onDrop} accept={'image/*'}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <label htmlFor="image">Her mit deinen Bildern!</label>
                        <input id="image" name="image" {...getInputProps()} />
                    </div>
                )}
            </Dropzone>

            {!!image && <Img alt="Vorschau" src={URL.createObjectURL(image)} />}
            {!!image && (
                <button
                    type="button"
                    onClick={() => {
                        var formData = new FormData()
                        formData.append('image', image)
                        axios
                            .post('/server/send.js', formData)
                            .then(res => {
                                if (res.status === 200) {
                                    alert('Yay, danke dir!')
                                }
                            })
                            .catch(e => alert(e.message))
                    }}
                >
                    Hochladen
                </button>
            )}
        </Fragment>
    )
}

export default ImageUpload
