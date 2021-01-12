import React from 'react';
import './index.css';
import { Container, Row, Col, Button, Card, Form, Modal, Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import RestProvider from '../../service/provider/RestProvider.js';
import CardapioProvider from '../../service/provider/CardapioProvider.js';
import {useHistory} from 'react-router-dom';
function Cad({history}){
    history=useHistory();
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    const [rest , setRest] = React.useState(null);
    const [cardapio, setCardapio] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [email,setEmail] = React.useState("");
    const [senha,setSenha] = React.useState("");
    const [nome,setNome] = React.useState("");
    const [phone,setPhone] = React.useState("");
    const loginClose = () => setShow(false);
    const loginShow = () => setShow(true);
    const cadastroClose = () => setShow2(false);
    const cadastroShow = () => setShow2(true);
    React.useEffect(() => {
        getData();
        getCardapio();
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
    async function getCardapio(){
        try{
            let r = await CardapioProvider.getData();
            console.log(r);
            setCardapio(r);
        }catch(err){
            throw err;
        }
    }
    async function cadastro(){
        let data={
            pes_nome:nome,
            pes_email:email,
            pes_senha:senha,
            pes_fone:phone
        }
        try{
            let r = await RestProvider.cadastroCliente(data);
            alert("Cadastro realizado com sucesso");
        }catch(err){
            throw err;
        }
    }
    async function login(){
        try{
            let r = await RestProvider.login(email,senha);
            if(r.adm){
                localStorage.setItem("user",r);
                history.push({pathname:"/dashboard",});
            }else{
                localStorage.setItem("user",r.pessoa);
                localStorage.setItem("id",r.pessoa.pes_ID);
                history.push({pathname:"/cliente",});
            }
        }catch(err){
            throw err;
        }
    }
    return(
        <Container fluid className="bgimgfull">
            <Helmet>
                {rest && rest.rest_nome ? (
                    <title>{rest.rest_nome} - Cardapio</title>
                ):(
                    <title>Cardapio</title>
                )}
            </Helmet>
            <header>
                <Navbar className="bg-sys" expand="lg" bg="dark" variant="dark">
                    {rest && rest.rest_logo ? (
                        <Navbar.Brand href="./">
                            <img src={rest.rest_logo} alt="logo" width="30px" height="30px"/>
                        </Navbar.Brand>
                    ):(
                        <Navbar.Brand href="./">
                        </Navbar.Brand>
                    )}
                    <Navbar.Collapse id="navbar">
                        <Nav className="mr-auto">
                            <Nav.Link href="./">Inicio</Nav.Link>
                            <Nav.Link href="./cardapio">Cardapio</Nav.Link>
                        </Nav>
                        <Navbar.Toggle aria-controls="navbar" />
                        <Form inline>
                            <Navbar.Text>
                                <Button variant="outline-light" className="my-2 my-sm-0" onClick={loginShow}>Login</Button>
                                ou
                                <Button variant="outline-light" className="my-2 my-sm-0" onClick={cadastroShow}>Cadastro</Button>
                            </Navbar.Text>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </header>
            <main>
                <Row>
                    <Col className="text-center">
                        <Row>
                            {cardapio.map((item) => (
                                <Col>
                                    <Card>
                                        <Card.Header>
                                            {item.com_nome}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                <img src={item.com_img} width="150px" height="150px" />
                                            </Card.Title>
                                            <Card.Text>
                                                R$ {item.com_preco.toString().replace(".",",")}
                                            </Card.Text>
                                            <Card.Text>
                                                {item.com_desc}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </main>
            <footer class="bg-sys">
                <Row>
                    <Col lg="5" className="d-none d-lg-block text-center">
                        <p>Genrest é um sistema com o intiuito de ajudar o gerente com controle do cardapio e das reservas feita pelos clientes.</p>
                    </Col>
                    <Col sm="12" lg="7" className="text-center">
                        <p>Redes sociais</p>
                    </Col>
                </Row>
            </footer>
            <Modal show={show} onHide={loginClose} className="fade">
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="Form.email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group controlId="Form.email">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control name="senha" type="password" value={senha} onChange={(event)=>{setSenha(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group controlId="Form.email">
                            <Button variant="success" onClick={()=>{login()}}>Login</Button>
                        </Form.Group>
					</Form>
                </Modal.Body>
            </Modal>
            <Modal show={show2} onHide={cadastroClose} className="fade">
                <Modal.Header closeButton>
                    <Modal.Title>Cadastro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control name="nome" type="text" value={nome} onChange={(event)=>{setNome(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Telefone</Form.Label>
                            <Form.Control name="phone" type="text" value={phone} onChange={(event)=>{setPhone(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group controlId="Form.email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" value={email} onChange={(event)=>{setEmail(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group controlId="Form.email">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control name="senha" type="password" value={senha} onChange={(event)=>{setSenha(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="success" onClick={()=>{cadastro()}}>Cadastro</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
export default Cad;