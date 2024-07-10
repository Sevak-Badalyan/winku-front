import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getPhotos } from '../../utils/api/photosApi';
import './Photos.scss';

export default function Photos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { id } = JSON.parse(localStorage.getItem('userData'));

        getPhotos(id).then((result) => {
            setPhotos(result);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className='photoContainer'>
            <div className='photos'>
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton height={200} width={300} />
                        </div>
                    ))
                ) : (
                    photos.length > 0 ? (
                        photos.map((photo, index) => (
                            <div key={index}>
                                <img src={`${photo.postPhoto}`} alt={`Photo ${index + 1}`} />
                            </div>
                        ))
                    ) : (
                            <span className='no-photos'>
                                No Pictures Available
                            </span>
                           

                    )
                )}
            </div>
        </div>
    );
}

// import React, { useEffect, useState } from 'react';
// import { getPhotos } from '../../utils/api/photosApi';
// import './Photos.scss';

// export default function Photos() {

//     const [photos, setPhotos] = useState([]);
//     useEffect(() => {
//         const {id} = JSON.parse(localStorage.getItem('userData'))

//         getPhotos(id).then((result) => {
//             setPhotos(result)
//         })
//     }, [])


//     return (
//         <div className='photoContainer'>
//             <div className='photos'>
//                 {photos.map((photo, index) => (
//                     <div key={index}>
//                         <img src={`${photos[index].postPhoto}`} alt={`Photo ${index + 1}`} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
