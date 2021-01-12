import React from 'react';
import './index.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import RestProvider from '../../service/provider/RestProvider.js';
import {useHistory} from 'react-router-dom';
import CHeader from '../../components/Cheader.js';
function ClienteConfig({history}){
    history=useHistory();
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    const [id, setID] = React.useState(localStorage.getItem("id"));
    const [rest , setRest] = React.useState(null);
    const [email, setEmail] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [fone, setFone] = React.useState("");
    React.useEffect(() => {
        getData();
        if(!user){
            history.push({pathname:"/"});
        }
    }, []);
    async function getData(){
        try{
            let r = await RestProvider.getData();
            setRest(r);
            let p = await RestProvider.getPessoa(id);
            setUser(p);
            setEmail(p.pes_email);
            setSenha(p.pes_senha);
            setFone(p.pes_fone);
            return r;
        }catch(err){
            throw err;
        }
    }
    async function save(){
        let data={
            pes_email:email,
            pes_senha:senha,
            pes_fone:fone
        }
        try{
            let r = await RestProvider.pes_save(id,data);
            setUser(r);
            setEmail(r.pes_email);
            setSenha(r.pes_senha);
            setFone(r.pes_fone);
            localStorage.setItem("user",r);
            alert("Dados salvo com sucesso");
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
                        <Form>
                            <h3>Dados do {user.pes_nome}</h3>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control name="fone" type="text" value={fone} onChange={(event)=>{setFone(event.target.value)}}/>
                            </Form.Group>
                            <Form.Group>
                            <Form.Label>Senha</Form.Label>
                                <Form.Control name="senha" type="password" value={senha} onChange={(event)=>{setSenha(event.target.value)}}/>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="outline-success" onClick={()=>{save()}}>Salvar</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </main>
        </Container>
    );
}

export default ClienteConfig;