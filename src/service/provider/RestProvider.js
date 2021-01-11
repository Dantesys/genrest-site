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
var cadastroCliente = async(data) => {
    try{
        let r = await api.post(`/cadastro/cliente`,{data});
        return r.data;
    }catch(err){
        throw err;
    }
}
const RestProvider = {
    getData:getData,
    login:login,
    cadastroCliente:cadastroCliente
}
export default RestProvider;