import React from 'react';
import './index.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import RestProvider from '../../service/provider/RestProvider.js';
import MesaProvider from '../../service/provider/MesaProvider.js';
import {useHistory} from 'react-router-dom';
import image from '../../assets/mesa.png';
import DHeader from '../../components/Dheader.js';
function Dashboard({history}){
    history=useHistory();
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    const [rest , setRest] = React.useState(null);
    const [mesas, setMesas] = React.useState([]);
    React.useEffect(() => {
        getData();
        getMesas();
        if(!user){
            history.push({pathname:"/"});
        }
    }, []);
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
            setMesas(r);
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
            <DHeader dado={{rest:rest,user:user}}/>
            <main>
                <Row>
                    <Col className="text-center cmain justify-content-center">
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