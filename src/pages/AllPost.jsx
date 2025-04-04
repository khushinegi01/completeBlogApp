import React, { useEffect, useState } from 'react';
import { Container } from '../component/container/Container';
import appwriteServices from '../appwrite/config';
import PostCard from '../component/PostCard';

function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteServices.getAllPosts([]).then((response) => {
            if (response && response.documents) {
                setPosts(response.documents);
            } else {
                console.error("No posts found or invalid response:", response);
            }
        }).catch((error) => {
            console.error("Error fetching posts:", error);
        });
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <p className="text-center w-full">No posts available</p>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
