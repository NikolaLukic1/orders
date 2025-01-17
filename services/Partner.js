import axios from 'axios';

//const url = process.env.NODE_ENV === 'production'? 'api/partners/' : 'http://localhost:5000/api/partners/'
const url = 'http://localhost:5000/api/partner/'

class PartnerService{
//Get posts
static getPartners(){
    return new Promise(async (resolve,reject) => {
        try{
            const res = await axios.get(url);
            const data = res.data;
            console.log(res);
            resolve(
                res.data
                );
        } catch(err){
            reject(err);
        }
    })
}

// static getPartner(id){
//     return new Promise(async (resolve,reject) => {
//         try{
//             const res = await axios.get(`${url}${id}`);
//             const data = res.data;
//             resolve(
//                 res.data
//                 );
//         } catch(err){
//             reject(err);
//         }
//     })
// }

    //Create posts
static insertPartner(partner){
    return axios.post(url, 
        partner
    );
}
    //Delete posts
static deletePatrner(id){
    return axios.delete(`${url}${id}`);
}

}

export default PartnerService;