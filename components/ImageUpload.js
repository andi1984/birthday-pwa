import React, { Fragment, useCallback, useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import styled from 'styled-components'
import { Icon, Button, Divider } from 'antd'
export const Img = styled.img`
    height: auto;
    width: auto;
    max-width: 100%;
`

const ImageDropZone = styled.div`
    width: 100%;
    height: auto;
    padding: 20px;
    margin: 20px;
    background: #eee;
    text-align: center;
    border: 1px dashed black;
`

const FlexLabel = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 2em;
`
const ImageUpload = () => {
    const [image, setImage] = useState(null)
    const [isLoading, setLoading] = useState(false)
    const onDrop = useCallback(acceptedFiles => {
        if (Array.isArray(acceptedFiles) && acceptedFiles.length > 0) {
            setImage(acceptedFiles[0])
        }
    }, [])

    return (
        <Fragment>
            <Divider orientation="left">Bilder Upload</Divider>
            <Dropzone multiple={false} onDrop={onDrop} accept={'image/*'}>
                {({ getRootProps, getInputProps }) => (
                    <ImageDropZone {...getRootProps()}>
                        <FlexLabel htmlFor="image">
                            <Icon type="cloud-upload" />
                            Her mit deinen Bildern!
                        </FlexLabel>
                        <input id="image" name="image" {...getInputProps()} />
                    </ImageDropZone>
                )}
            </Dropzone>

            {!!image && <Img alt="Vorschau" src={URL.createObjectURL(image)} />}
            {!!image && (
                <Button
                    type="primary"
                    onClick={() => {
                        setLoading(true)
                        var formData = new FormData()
                        formData.append('image', image)
                        axios
                            .post('/server/send.js', formData)
                            .then(res => {
                                if (res.status === 200) {
                                    alert('Yay, danke dir!')
                                }
                            })
                            .catch(e =>
                                alert(
                                    `Whoops, da ging was schief. Nicht verzagen, Andi fragen!
                                    ${e.message}`
                                )
                            )
                            .finally(() => setLoading(false))
                    }}
                    shape="round"
                    icon="cloud-upload"
                    size="large"
                    loading={isLoading}
                >
                    Upload
                </Button>
            )}
        </Fragment>
    )
}

export default ImageUpload
