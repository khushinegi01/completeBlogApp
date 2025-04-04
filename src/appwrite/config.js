import conf from '../conf/conf.js';
import {Client, Databases, ID, ImageGravity, Permission, Query, Role, Storage} from "appwrite"

export class Services{
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriterURL)
            .setProject(conf.appwriterProjectId)
        
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }
    async createPost({ Title, Content, FeaturedImage, Status, UserId }) {
        try {
            
            const slug = Title.trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, '-'); 
    
            return await this.databases.createDocument(
                conf.appwriterDatabaseId,
                conf.appwriterCollectionId,
                slug, 
                {
                    Title,
                    Content,
                    FeaturedImage,
                    Status,
                    UserId
                }
            );
        } catch (error) {
            console.log("AppWrite :: createPost :: error ::", error);
        }
    }
    

    async updatePost(slug, { Title, Content, FeaturedImage, Status }) {
        try {
            const result = await this.databases.updateDocument(
                conf.appwriterDatabaseId,
                conf.appwriterCollectionId,
                slug,
                {
                    Title,
                    Content,
                    FeaturedImage,
                    Status
                },
                [
                    Permission.read(Role.any()),
                    Permission.update(Role.users())
                ]
            );
            console.log("Update Result:", result);
            return result;
        } catch (error) {
            console.log("AppWrite :: updatePost :: error ::", error);
        }
    }
    

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriterDatabaseId,
                conf.appwriterCollectionId,
                slug
            )
            return true
        }
        catch(error) {
            console.log("AppWrite :: deletePost :: error ::", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriterDatabaseId,
                conf.appwriterCollectionId,
                slug
            )
        }
        catch(error) {
            console.log("Appwrite :: getPost :: error ::", error)
            return false
        }
    }

    async getAllPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriterDatabaseId,
                conf.appwriterCollectionId,
                [
                    Query.equal("Status", ["Active"]),
                    Query.limit(25),
                    Query.offset(0)
                ] 
            )
        }
        catch(error) {
            console.log("AppWrite :: getAllPosts :: error :: ", error)
            return false
        }
    }
    


    // File Uploads
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriterBucketId,
                ID.unique(),
                file
            )
        }
        catch(error) {
            console.log("AppWrite :: uploadFile :: error :: ", error)
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriterBucketId,
                fileId
            )
            return true
        } 
        catch (error) {
            console.log("AppWrite :: deleteFile :: error :: ", error)
            return false
        }
    }

    getPreview(fileId) {
    if (!fileId) {
        console.error("Missing required parameter: 'fileId'");
        return null; 
    }

    try {
        return this.bucket.getFileView(conf.appwriterBucketId,fileId);
    } catch (error) {
        console.error("AppWrite :: getFilePreview :: error ::", error);
        return null;
    }
}

    async getFileDownload(fileId){
        console.log(file)
        try {
            return this.bucket.getFileDownload(
                conf.appwriterBucketId,
                fileId
                
            )
        }
        catch(error) {
            console.log("AppWrite :: getFileDownload :: error :: ", error)
            return false
        }
    }
}

const appwriteServices = new Services()

export default appwriteServices;