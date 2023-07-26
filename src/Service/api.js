import axios from 'axios';
const baseurl=process.env.REACT_APP_BASE_URL;
console.log(baseurl)

const checkurl = `${baseurl}/blogs?populate=*&pagination[page]=1&pagination[pageSize]=3`;
const tokenStr="3ff24ca87b0ecc90f453edcd3c4bc78cb664e81f6db01a21a2ac65b7be6d7cdf7f3ef042a1fbb81d0a36e6fc7f932f30eb1d9fbef0d3f49b2761f7b9dbdaf3952b8f21e3530b2b4023257cfc70edc92b89d91f1e3ac3790ec164e8d680fc7efccd18164e69a717e3880c659cf2047dc8c176209fc6f06fc81db7dd34eca11884";

export const getBlog = async () => {
    return await axios.get(`${checkurl}`,{headers:{"Authorization":`bearer ${tokenStr}`}});
}

export const serachBlog=async(serach)=>{
       const checkurl =`${baseurl}/blogs?filters[title][$containsi]=${serach}&populate=*`
    return await axios.get(`${checkurl}`,{headers:{"Authorization":`bearer ${tokenStr}`}});
}

export const getBlogid=async(slug)=>{
    const checkurlslug=`${baseurl}/blogs?filters[slug][$eq]=${slug}&populate=*`
    return await axios.get(`${checkurlslug}`,{headers:{"Authorization":`bearer ${tokenStr}`}});    
}

export const getcatagory=async()=>{
    const checkcatagory=`${baseurl}/catagories?populate=*`
    return await axios.get(`${checkcatagory}`,{headers:{"Authorization":`bearer ${tokenStr}`}});
}

export const getBlogpage= async (page) => {
       const checked_url= `${baseurl}/blogs?populate=*&pagination[page]=${page}&pagination[pageSize]=3`
    return await axios.get(`${checked_url}`,{headers:{"Authorization":`bearer ${tokenStr}`}});
}

export const getSluCat=async(slug)=>{
    const checkurlslug=`${baseurl}/blogs?filters[catagories][slug][$eq]=${slug}&populate=*`
    return await axios.get(`${checkurlslug}`,{headers:{"Authorization":`bearer ${tokenStr}`}});    
}



export const getrecent=async()=>{
    const checkrecenturl=`${baseurl}/blogs?sort[0]=createdAt%3Adesc&populate=*&pagination[page]=1&pagination[pageSize]=5`
    return await axios.get(`${checkrecenturl}`,{headers:{"Authorization":`bearer ${tokenStr}`}});    
}





