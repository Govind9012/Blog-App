import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js";

export class AuthService{
    client = new Client();
    account;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async creatAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // redirect to login if userAccount created
            }else{
                // redirect again to the same page
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
    
        } catch (error) {
           throw error; 
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
            // Logged in
        } catch (err) {
            // Not logged in
            throw err;
        }
        return null;
    }

    async logout(){
        try {
            return await account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;