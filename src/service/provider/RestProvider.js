import { api } from '../api';
var getData = async () => {
    try{
        let r = await api.get('/rest');
        return r.data;
    } catch(err){
        throw err;
    }
}
var getGen = async () => {
    try{
        let r = await api.get('/rest/gen');
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
var save = async (data) => {
    try{
        let r = await api.post('/rest/save',{data});
        return r.data;
    }catch(err){
        throw err;
    }
}
var gen_save = async (data) => {
    try{
        let r = await api.post('/rest/gen/save',{data});
        return r.data;
    }catch(err){
        throw err;
    }
}
var getPessoa = async (id) => {
    try{
        let r = await api.get(`/pessoa/${id}`);
        return r.data;
    }catch(err){
        throw err;
    }
}
var pes_save = async (id,data) => {
    try{
        let r = await api.post(`/pessoa/edit/${id}`,{data});
        return r.data;
    }catch(err){
        throw err;
    }
}
var makeRes = async (id,data) => {
    try{
        let r = await api.post(`/reserva/pessoa/${id}`,{data});
        return r.data;
    }catch(err){
        throw err;
    }
}
var getRes = async (id) => {
    if(id){
        try{
            let r = await api.get(`/reserva/${id}`);
            return r.data;
        }catch(err){
            throw err;
        }
    }else{
        try{
            let r = await api.get(`/reservas`);
            return r.data;
        }catch(err){
            throw err;
        }
    }
}
var delRes = async (id) => {
    try{
        let r = await api.delete(`/reserva/del/${id}`);
        return r.data;
    }catch(err){
        throw err;
    }
}
const RestProvider = {
    getData:getData,
    login:login,
    cadastroCliente:cadastroCliente,
    save:save,
    gen_save:gen_save,
    getGen:getGen,
    getPessoa:getPessoa,
    pes_save:pes_save,
    getRes:getRes,
    makeRes:makeRes,
    delRes:delRes
}
export default RestProvider;