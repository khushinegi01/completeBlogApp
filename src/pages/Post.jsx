import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Button from "../component/Button";
import { Container } from "../component/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import DOMPurify from 'dompurify'; // Import DOMPurify

const cleanHtml = (html) => {
    let cleanedHtml = html.replace(/data-start="[^"]*"/g, ''); // Remove data-start attributes
    cleanedHtml = cleanedHtml.replace(/data-end="[^"]*"/g, ''); // Remove data-end attributes
    cleanedHtml = cleanedHtml.replace(/class=""/g, ''); // Remove empty class attributes

    // Sanitize with DOMPurify, allowing certain styles
    return DOMPurify.sanitize(cleanedHtml, {
        ALLOWED_TAGS: ['span', 'h1', 'h2', 'h3', 'p', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: ['style'],
        ALLOWED_STYLE_PROPS: ['color']
    });
};
export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.UserId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.FeaturedImage);
                navigate("/");
            }
        });
    };

    const sanitizedContent = post?.Content ? DOMPurify.sanitize(cleanHtml(post.Content)) : '';

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative  p-2">
                    {post.FeaturedImage ? (
                        <img
                            src={appwriteService.getPreview(post.FeaturedImage)}
                            alt={post.Title}
                            className="rounded-xl w-xl h-max"
                        />
                    ) : (
                        <p>No image available</p> // Fallback for missing image
                    )}

                    {isAuthor && (
                        <div className="absolute right-9 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 hover:bg-green-700 duration-700" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-orange-500 hover:bg-orange-700 duration-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold flex justify-center items-center text-center">{post.Title}</h1>
                </div>
                <div className="blog-content">
                    {sanitizedContent ? parse(sanitizedContent) : <p>No content available</p>}
                </div>
            </Container>
        </div>
    ) : null;
}
