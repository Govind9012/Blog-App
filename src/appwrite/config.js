import { Client, ID, Databases, Query, Storage } from "appwrite";
import conf from "../conf/conf";


export class Service{
    client = new Client()
    databases;
    bucket;//storage

    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
        
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId, 

                }
            )
        } catch (error) {
            console.log("config.js :: createPost :: error" , error)
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("config :: updatePost :: error", error);
            
        }
    }

    async deletePost(slug){ // slug is documentId
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("config :: deletePost:: error", error);
            return false;
        }
    }

    
}

const service = new Service()

export default service;