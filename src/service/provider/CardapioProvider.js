import { api } from '../api';
var getData = async () => {
    try{
        let r = await api.get('/cardapio');
        return r.data;
    } catch(err){
        throw err;
    }
}
var addComida = async (comida) => {
    try{
        let r = await api.post('/cardapio/add',{comida});
        return r.data;
    } catch(err){
        throw err;
    }
}
var delComida = async (id) => {
    try{
        let r = await api.delete(`/cardapio/delete/${id}`);
        return r.data;
    } catch(err){
        throw err;
    }
}
var editComida = async (id,comida) => {
    try{
        console.log(id);
        let r = await api.put(`/cardapio/edit/${id}`,{comida,id});
        return r.data;
    }catch(err){
        throw err;
    }
}
const CardapioProvider = {
    getData:getData,
    addComida:addComida,
    delComida:delComida,
    editComida:editComida
}
export default CardapioProvider;