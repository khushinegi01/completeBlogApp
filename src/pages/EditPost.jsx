import React from 'react'
import { useEffect , useState } from 'react'
import appwriteServices from '../appwrite/config'
import { Container } from '../component/container/Container'
import PostForm from '../component/post-form/PostForm'
import { useNavigate , useParams } from 'react-router-dom'

function EditPost() {
    const [posts , setPosts] = useState(null)
    const navigate = useNavigate()
    const {slug} = useParams()
    useEffect(()=>{
        if(slug){
            appwriteServices.getPost(slug).then((posts)=>{
                if(posts){
                    console.log("EditPost :: useEffect :: posts :: ",posts)
                    setPosts(posts)
                }
            })
        }
        else{
            navigate('/')
        }
    },[slug , navigate])

    
    return posts ? (
      <div className='py-8'>
        <Container>
            <PostForm post={posts}/>
        </Container>
      </div>
    ) : <div>
        nothing here
    </div>
}

export default EditPost  