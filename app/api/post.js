import client from "./client";

export const getFeaturedPosts = async () =>{

    try{
        const{data} = await client("http://192.168.1.3:4848/api/post/featured-posts")
        return data
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data
        }
        return {error:error.message || error};
    }
}


export const getLatestPosts = async (limit,pageNo) =>{

    try{
        const{data} = await client(`http://192.168.1.3:4848/api/post/posts?limit=${limit}&pageNo=${pageNo}`)
        return data
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data
        }
        return {error:error.message || error};
    }
}

export const getSinglePost = async (slug) =>{

    try{
        const{data} = await client(`http://192.168.1.3:4848/api/post/single/${slug}`)
        return data
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data
        }
        return {error:error.message || error};
    }
}

export const getSimilerPosts = async (id) =>{

    try{
        const{data} = await client(`http://192.168.1.3:4848/api/post/related-posts/${id}`)
        return data
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data
        }
        return {error:error.message || error};
    }
}

export const searchPosts = async (query) =>{

    try{
        const{data} = await client(`http://192.168.1.3:4848/api/post/search?title=${query}`)
        return data
    }catch(error){
        const {response} = error;
        if(response?.data){
            return response.data
        }
        return {error:error.message || error};
    }
}