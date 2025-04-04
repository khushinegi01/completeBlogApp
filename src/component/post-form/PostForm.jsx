import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import Input from '../Input';
import Select from '../Select';
import RTE from '../RTE';
import appwriteServices from '../../appwrite/config';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

function PostForm({ post }) {
    const userData = useSelector(state => state.auth?.userData);
    const navigate = useNavigate();

    const { register, handleSubmit, watch, setValue, getValues, control ,reset } = useForm({
        defaultValues: {
            title: post?.Title || "",
            slug: post?.$id || "",
            content: post?.Content || "",
            status: post?.Status || "active",
        }
    });

    const submit = async (data) => {
        console.log("Submitting data:", data);
        try {
            if (post) {
                const file = data.image && data.image.length > 0 ? await appwriteServices.uploadFile(data.image[0]) : null;
                if (file) {
                    await appwriteServices.deleteFile(post.FeaturedImage);
                }
                const dbPost = await appwriteServices.updatePost(post.$id,{
                    Title: data.title,
                    Content: data.content,
                    FeaturedImage: file ? file.$id : post.FeaturedImage,
                    Status: data.status,
                });
                if (dbPost) {
                    console.log("PostForm :: submit :: dpPost ::",dbPost)
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = data.image && data.image.length > 0 ? await appwriteServices.uploadFile(data.image[0]) : null;
                if (file) {
                    const fileId = file.$id;
                    data.FeaturedImage = fileId;
                    const dbPost = await appwriteServices.createPost({
                        Title: data.title,
                        Content: data.content,
                        FeaturedImage: fileId,
                        Status: data.status,
                        UserId: userData.$id
                    });
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, '-');
        }
        return '';
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                const transformedSlug = slugTransform(value.title);
                setValue('slug', transformedSlug, { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    useEffect(() => {
        if (post) {
            reset({
                title: post.Title,
                slug: post.slug || post.$id, 
                content: post.Content,
                status: post.Status,
            });
        }
    }, [post, reset]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })}
                />
                <RTE label="Content :" name="content" control={control} defaultValues={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.FeaturedImage ? (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteServices.getPreview(post.FeaturedImage)} 
                            alt={post.Title}
                            className="rounded-lg"
                        />
                    </div>
                ) : (
                    <div className="w-full mb-4">
                        <p>No prev image in database</p>
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500 hover:bg-green-700 duration-700" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>

    );
}
export default PostForm;