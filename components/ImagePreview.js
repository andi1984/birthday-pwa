import React, { useEffect, useState } from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import axios from 'axios'
import { Icon } from 'antd'
import { Img } from './ImageUpload'
const ImagePreview = () => {
    const [isLoading, setLoading] = useState(false)
    const [imageResources, setImageResources] = useState([])
    useEffect(() => {
        setLoading(true)
        axios
            .get('/server/googlephotos.js')
            .then(res => {
                setImageResources(res.data)
            })
            .catch(() =>
                alert(
                    'Whoops, da ging was schief. Nicht verzagen, Andi fragen!'
                )
            )
            .finally(() => setLoading(false))
    }, [])

    return isLoading ? (
        <Icon type="loading" style={{ fontSize: '4em' }} />
    ) : (
        <Masonry>
            {imageResources.map((resource, index) => (
                <Img key={index} src={resource.url} />
            ))}
        </Masonry>
    )
}

export default ImagePreview
