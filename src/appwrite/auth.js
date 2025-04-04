import conf from '../conf/conf.js';
import {Client , Account , ID} from "appwrite"

export class AuthServices{
    client = new Client()
    account;
    constructor(){
        this.client
        .setEndpoint(conf.appwriterURL)
        .setProject(conf.appwriterProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({email , password , name }){
        try{
            const createAccount = await this.account.create(ID.unique(), email , password , name);
            if(createAccount){
                return this.login({email , password})
            }
            else{
                return createAccount
            }
        }
        catch(error){
            throw error
        }
    }

    async login({email , password}){
        try{
            return await this.account.createEmailPasswordSession(email , password)
        }
        catch(error){
            throw error
        }
    }
    
    async getCurrentUser(){
       try {
            return await this.account.get()
       }
       catch(error) {
            console.log("AppWrite :: getCurrentUser :: Error :: ", error)
       }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        }
        catch(error) {
            throw error
        }
    }
}



const authServices = new AuthServices();

export default authServices