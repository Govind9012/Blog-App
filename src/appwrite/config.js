import { Client, ID, Databases, Query, Storage } from "appwrite";
import conf from "../conf/conf";
import { legacy_createStore } from "@reduxjs/toolkit";


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

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite :: getpost :: error" , error);
            
        }

    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("appwrite :: getPosts :: error", error);
            return false
        }
    }

    // file upload services

    async uploadFile(file){
        try {
            return await this.Storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            )
        } catch (error) {
            console.log("appwrite :: uploadFile :: error", error);
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.Storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("appwrite :: deleteFile :: error", error);
            return false
        }
    }

    getFilPreview(fileId){
        // return this.Storage.getFilPreview(
        //     conf.appwriteBucketId,
        //     fileId
        // )
    }
}

const service = new Service()

export default service;