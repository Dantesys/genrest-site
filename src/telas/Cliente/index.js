import React from 'react';
import './index.css';
import { Container, Row, Col, Button, Modal, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import RestProvider from '../../service/provider/RestProvider.js';
import {useHistory} from 'react-router-dom';
import CHeader from '../../components/Cheader.js';
function Cliente({history}){
    history=useHistory();
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    const [id, setID] = React.useState(localStorage.getItem("id"));
    const [rest , setRest] = React.useState(null);
    const [res, setRes] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [data, setData] = React.useState("");
    const reservaClose = () => setShow(false);
    const reservaShow = () => setShow(true);
    React.useEffect(() => {
        getData();
        getReservas();
        if(!user){
            history.push({pathname:"/"});
        }
    }, []);
    async function getReservas(){
        try{
            let r = await RestProvider.getRes(id);
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
    async function add(){
        try{
            let r = await RestProvider.makeRes(id,data);
            setRes(res=>[...res,r]);
            reservaClose();
            alert("Reserva feita com sucesso");
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
    return(
        <Container fluid className="bgimgfull">
            <Helmet>
                {rest && rest.rest_nome ? (
                    <title>{rest.rest_nome} - Dashboard</title>
                ):(
                    <title>Dashboard</title>
                )}
            </Helmet>
            <CHeader dado={{rest:rest,user:user}}/>
            <main>
                <Row>
                    <Col className="text-center cmain justify-content-center">
                        <Row>
                            <Col sm="12" lg="2">
                                <Button variant="outline-success" onClick={()=>{reservaShow()}}>Fazer reserva</Button>
                            </Col>
                            {res.map((item,key) => (
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>Reserva para {fixDate(item.res_data,1)}/{fixDate(item.res_data,2)}/{fixDate(item.res_data,3)}</Card.Title>
                                            <Card.Text><Button variant="outline-danger" onClick={()=>{del(item.res_ID,key)}}>Cancelar reserva</Button></Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </main>
            <Modal show={show} onHide={reservaClose} className="fade">
                <Modal.Header closeButton>
                    <Modal.Title>Reserva</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Data</Form.Label>
                            <Form.Control name="data" type="date" value={data} onChange={(event)=>{setData(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="success" onClick={()=>{add()}}>Adicionar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Cliente;