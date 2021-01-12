import React from 'react';
import './index.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import RestProvider from '../../service/provider/RestProvider.js';
import {useHistory} from 'react-router-dom';
import DHeader from '../../components/Dheader.js';
import imageCompression from 'browser-image-compression';
function Config({history}){
    history=useHistory();
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    const [rest , setRest] = React.useState(null);
    const [rnome, setRnome] = React.useState("");
    const [rdesc, setRdesc] = React.useState("");
    const [rlogo, setRlogo] = React.useState("");
    const [gnome, setGnome] = React.useState(user.pes_nome);
    const [gemail, setGemail] = React.useState(user.pes_email);
    const [gsenha, setGsenha] = React.useState(user.pes_senha);
    const [gfone, setGfone] = React.useState(user.pes_fone);
    const options = {
        maxSizeMB: 0.01,
        maxWidthOrHeight: 1024,
        useWebWorker: true
    }
    React.useEffect(() => {
        getData();
        if(!user){
            history.push({pathname:"/"});
        }
    }, []);
    async function getData(){
        try{
            let r = await RestProvider.getData();
            let g = await RestProvider.getGen();
            setRest(r);
            setRnome(r.rest_nome);
            setRdesc(r.rest_desc);
            setUser(g);
            setGnome(g.pes_nome);
            setGemail(g.pes_email);
            setGsenha(g.pes_senha);
            setGfone(g.pes_fone);
            return r;
        }catch(err){
            throw err;
        }
    }
    async function Rsave(){
        try{
            let file = document.getElementById('logo').files[0];
            if(file){
                let file_compress = await imageCompression(file, options);
                let reader = new FileReader();
                let img = null;
                reader.readAsDataURL(file_compress);
                img=reader.result;
                reader.onload = async () => {
                    img=reader.result;
                    let rest = {
                        rest_nome:rnome,
                        rest_desc:rdesc,
                        rest_logo:img
                    }
                    let r = await RestProvider.save(rest);
                    setRest(r);
                    alert("Dados salvo com sucesso!");
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                }
            }else{
                let rest = {
                    rest_nome:rnome,
                    rest_desc:rdesc,
                    rest_logo:rest.rest_logo
                }
                let r = await RestProvider.save(rest);
                setRest(r);
                alert("Dados salvo com sucesso!");
            }
        }catch(err){
            throw err;
        }
    }
    async function Gsave(){
        try{
            let data={
                pes_nome:gnome,
                pes_email:gemail,
                pes_senha:gsenha,
                pes_fone:gfone
            }
            let r = await RestProvider.gen_save(data);
            setUser(r);
            localStorage.setItem("user",r);
            alert("Dados salvo com sucesso!");
        }catch(err){
            throw err;
        }
    }
    return(
        <Container fluid className="bgimgfull">
            <Helmet>
                {rest && rest.rest_nome ? (
                    <title>{rest.rest_nome} - Configuração</title>
                ):(
                    <title>Configuração</title>
                )}
            </Helmet>
            <DHeader dado={{rest:rest,user:user}}/>
            <main>
                <Row>
                    <Col className="text-center cmain justify-content-center">
                        <Row>
                            <Col sm="12" lg="6" className="pd5">
                                <Form>
                                    <h3>Dados do restaurante</h3>
                                    <Form.Group>
                                        <Form.Label>Nome do restaurante</Form.Label>
                                        <Form.Control name="rnome" type="text" value={rnome} onChange={(event)=>{setRnome(event.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Descrição do restaurante</Form.Label>
                                        <Form.Control as="textarea" name="rdesc" value={rdesc} onChange={(event)=>{setRdesc(event.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Logo marca do restaurante</Form.Label>
                                        <Form.File label="Logo marca" data-browse="Buscar" id="logo" custom value={rlogo} onChange={(event)=>{setRlogo(event.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="outline-success" onClick={()=>{Rsave()}}>Salvar</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                            <Col sm="12" lg="6" className="pd5">
                                <Form>
                                    <h3>Dados do gerente</h3>
                                    <Form.Group>
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control name="gnome" type="text" value={gnome} onChange={(event)=>{setGnome(event.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control name="gemail" type="email" value={gemail} onChange={(event)=>{setGemail(event.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Telefone</Form.Label>
                                        <Form.Control name="gfone" type="text" value={gfone} onChange={(event)=>{setGfone(event.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control name="gsenha" type="password" value={gsenha} onChange={(event)=>{setGsenha(event.target.value)}}/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button variant="outline-success" onClick={()=>{Gsave()}}>Salvar</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </main>
        </Container>
    );
}

export default Config;