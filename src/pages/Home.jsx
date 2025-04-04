import React from 'react'
import { useState , useEffect } from 'react'
import appwriteServices from '../appwrite/config'
import { Container } from '../component/container/Container'
import PostCard from '../component/PostCard'
function Home() {
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        appwriteServices.getAllPosts().then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])
    if(posts.length === 0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div>
            <Container className='w-full py-8'>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
