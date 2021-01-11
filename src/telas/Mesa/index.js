import React from 'react';
import './index.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import RestProvider from '../../service/provider/RestProvider.js';
import MesaProvider from '../../service/provider/MesaProvider.js';
import {useHistory} from 'react-router-dom';
import DHeader from '../../components/Dheader.js';
import image from '../../assets/mesa.png';
import QRCode from 'qrcode'
function Dashboard({history}){
    history=useHistory();
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    const [rest , setRest] = React.useState(null);
    const [mesas, setMesas] = React.useState([]);
    React.useEffect(() => {
        getData();
        getMesas();
        console.log(user);
        console.log(history);
        if(!user){
            history.push({pathname:"/"});
        }
    }, []);
    async function makeQR(texto){
        try {
            let r = await QRCode.toDataURL(texto);
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
    async function getMesas(){
        try{
            let r = await MesaProvider.getData();
            console.log(r);
            setMesas(r);
        }catch(err){
            throw err;
        }
    }
    async function addMesa(){
        try{
            let n = mesas.length+1;
            let qr = await makeQR(n.toString());
            let r = await MesaProvider.addMesa(qr);
            setMesas(mesas => [...mesas, r]);
        }catch(err){
            throw err;
        }
    }
    async function remMesa(){
        try{
            let r = await MesaProvider.remMesa();
            let mesas_=mesas;
            console.log(mesas_);
            mesas_.pop();
            console.log(mesas_);
            setMesas(mesas_ => [...mesas_]);
        }catch(err){
            throw err;
        }
    }
    return(
        <Container fluid className="bgimgfull">
            <Helmet>
                {rest && rest.rest_nome ? (
                    <title>{rest.rest_nome} - Mesas</title>
                ):(
                    <title>Mesas</title>
                )}
            </Helmet>
            <DHeader dado={{rest:rest,user:user}}/>
            <main>
                <Row>
                    <Col className="text-center">
                        <Row>
                            <Col sm="12" lg="2">
                                <Button variant="outline-success" onClick={addMesa}>Adicionar mesa</Button>
                                <Button variant="outline-danger" onClick={remMesa}>Remover mesa</Button>
                            </Col>
                            <Row>
                                {mesas.map((item) => (
                                    <Col>
                                        <Card className={item.mes_status}>
                                            <Card.Header>
                                                {item.mes_ID}
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Title>{item.mes_status}</Card.Title>
                                                <Card.Text>
                                                    <img src={image} width="150px" height="150px" />
                                                </Card.Text>
                                                <Card.Footer>
                                                    <a className="btn btn-outline-info" href={item.mes_qr} download="qr.png">Baixar QR</a>
                                                </Card.Footer>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </main>
        </Container>
    );
}

export default Dashboard;