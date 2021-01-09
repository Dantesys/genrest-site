import { api } from '../api';
var getData = async () => {
    try{
        let r = await api.get('/rest');
        return r.data;
    } catch(err){
        throw err;
    }
}
var login = async (email,senha) => {
    try{
        let r = await api.get(`/login/${email}/${senha}`);
        return r.data;
    }catch(err){
        throw err;
    }
}
const RestProvider = {
    getData:getData,
    login:login
}
export default RestProvider;