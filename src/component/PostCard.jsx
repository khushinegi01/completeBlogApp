import React from 'react'
import {Link} from 'react-router-dom'
import appwriteServices from '../appwrite/config'
function PostCard({ $id, Title, FeaturedImage }) {
    const imageUrl = appwriteServices.getPreview(FeaturedImage);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-orange-200 mt-3 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {imageUrl ? (
                        <img src={imageUrl} alt={Title} className='rounded-xl w-full h-48 object-cover' />
                    ) : (
                        <p className='text-orange-700 items-center'>No image available</p> // Fallback if no image
                    )}
                </div>
                <h2 className='text-xl font-bold text-orange-700 items-center flex justify-center'>{Title}</h2>
            </div>
        </Link>
    );
}


export default PostCard
