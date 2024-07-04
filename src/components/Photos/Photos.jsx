

import React, { useEffect, useState } from 'react';
import { getPhotos } from '../../utils/api/photosApi';
import './Photos.scss';

export default function Photos() {

    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        const {id} = JSON.parse(localStorage.getItem('userData'))

        getPhotos(id).then((result) => {
            setPhotos(result)
        })
    }, [])


    return (
        <div className='photoContainer'>
            <div className='photos'>
                {photos.map((photo, index) => (
                    <div key={index}>
                        <img src={`${photos[index].postPhoto}`} alt={`Photo ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
