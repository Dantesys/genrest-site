import React from 'react';
import './index.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import RestProvider from '../../service/provider/RestProvider.js';
import {useHistory} from 'react-router-dom';
import DHeader from '../../components/Dheader.js';
function Dashboard({history}){
    history=useHistory();
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    const [rest , setRest] = React.useState(null);
    const [res, setRes] = React.useState([]);
    React.useEffect(() => {
        getData();
        getRes();
        if(!user){
            history.push({pathname:"/"});
        }
    }, []);
    async function getRes(){
        try{
            let r = await RestProvider.getRes();
            setRes(r);
            return r;
        }catch(err){
            throw err;
        }
    }
    async function getData(){
        try{
            let r = await RestProvider.getData();
            setRest(r);
            return r;
        }catch(err){
            throw err;
        }
    }
    async function del(id,key){
        try{
            let r = await RestProvider.delRes(id);
            let res_=res;
            res_.splice(key,1);
            setRes(res_ => [...res_]);
        }catch(err){
            throw err;
        }
    }
    function fixDate(data,id){
        let r = null;
        let dia = new Date(data);
        switch (id){
            case 1:
                r = dia.getDate();
                break;
            case 2:
                r = dia.getMonth()+1;
                break;
            case 3:
                r = dia.getFullYear();
        }
        return r;
    }
    return(
        <Container fluid className="bgimgfull">
            <Helmet>
                {rest && rest.rest_nome ? (
                    <title>{rest.rest_nome} - Dashboard</title>
                ):(
                    <title>Dashboard</title>
                )}
            </Helmet>
            <DHeader dado={{rest:rest,user:user}}/>
            <main>
                <Row>
                    <Col className="text-center cmain justify-content-center">
                        <Row>
                            {res.map((item,key) => (
                                <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Reserva de {item.res_pessoa.pes_nome} para {fixDate(item.res_data,1)}/{fixDate(item.res_data,2)}/{fixDate(item.res_data,3)}</Card.Title>
                                        <Card.Text><Button variant="outline-danger" onClick={()=>{del(item.res_ID,key)}}>Cancelar reserva</Button></Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </main>
        </Container>
    );
}

export default Dashboard;