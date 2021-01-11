import React from 'react';
import './index.css';
import { Container, Row, Col, Navbar, Nav, Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import RestProvider from '../../service/provider/RestProvider.js';
import {useHistory} from 'react-router-dom';
function Home({history}){
    history=useHistory();
    const [rest , setRest] = React.useState(null);
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
            if(r.funcionario){
                localStorage.setItem("user",r);
                history.push({pathname:"/dashboard",});
            }
        }catch(err){
            throw err;
        }
    }
    return(
        <Container fluid className="bgimgfull">
            <Helmet>
                {rest && rest.rest_nome ? (
                    <title>{rest.rest_nome} - Inicio</title>
                ):(
                    <title>Inicio</title>
                )}
            </Helmet>
            <header>
                <Navbar className="bg-sys" expand="lg" bg="dark" variant="dark">
                    {rest && rest.rest_logo ? (
                        <Navbar.Brand href="./">
                            <img src={rest.rest_logo} alt="logo"/>
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
                    <Col className="align-self-center">
                        {rest && rest.rest_nome ? (
                            <h2>Bem vindo ao restaurante {rest.rest_nome}</h2>
                        ):(
                            <h2>Bem vindo ao restaurante</h2>
                        )}
                        {rest && rest.rest_desc ? (
                            <p>{rest.rest_desc}</p>
                        ):(
                            <p></p>
                        )}
                    </Col>
                </Row>
            </main>
            <footer class="bg-sys">
                <Row>
                    <Col lg="5" className="d-none d-lg-block text-center">
                        <p>Genrest é um sistema com o intiuito de ajudar o gerente com controle do cardapio e da movimentação do restaurante.</p>
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

export default Home;