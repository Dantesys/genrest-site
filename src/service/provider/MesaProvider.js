import { api } from '../api';
var getData = async () => {
    try{
        let r = await api.get('/mesa');
        return r.data;
    } catch(err){
        throw err;
    }
}
var addMesa = async (qr) => {
    try{
        let r = await api.post('/mesa/add',{qr});
        return r.data;
    } catch(err){
        throw err;
    }
}
var remMesa = async () => {
    try{
        let r = await api.delete(`/mesa/delete`);
        return r.data;
    }catch(err){
        throw err;
    }
}
const MesaProvider = {
    getData:getData,
    addMesa:addMesa,
    remMesa:remMesa
}
export default MesaProvider;