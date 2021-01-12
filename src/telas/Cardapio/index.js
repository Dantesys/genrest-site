import React from 'react';
import './index.css';
import { Container, Row, Col, Button, Card, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';
import RestProvider from '../../service/provider/RestProvider.js';
import CardapioProvider from '../../service/provider/CardapioProvider.js';
import {useHistory} from 'react-router-dom';
import DHeader from '../../components/Dheader.js';
import imageCompression from 'browser-image-compression';
function Cardapio({history}){
    history=useHistory();
    const [user, setUser] = React.useState(localStorage.getItem("user"));
    const [rest , setRest] = React.useState(null);
    const [cardapio, setCardapio] = React.useState([]);
    const [show, setShow] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [desc,setDesc] = React.useState("");
    const [image,setImage] = React.useState("");
    const [nome,setNome] = React.useState("");
    const [preco,setPreco] = React.useState("");
    const [state,setState] =React.useState({imgUpload: ''});
    const [id,setID] =React.useState("");
    const [img64,setImg64]= React.useState("");
    const comidaClose = () => setShow(false);
    const comidaShow = () => setShow(true);
    const editcomidaClose = () => setShow2(false);
    const editcomidaShow = () => setShow2(true);
    const options = {
        maxSizeMB: 0.01,
        maxWidthOrHeight: 1024,
        useWebWorker: true
    }
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
    async function add(){
        try{
            let file = document.getElementById('img').files[0];
            let file_compress = await imageCompression(file, options);
            let reader = new FileReader();
            let img = null
            reader.readAsDataURL(file_compress);
            img=reader.result;
            reader.onload = async () => {
                img=reader.result;
                let comida = {
                    com_nome:nome,
                    com_desc:desc,
                    com_img:img,
                    com_preco:preco.replace(',','.')
                }
                let r = await CardapioProvider.addComida(comida);
                setCardapio(cardapio => [...cardapio, r]);
                comidaClose();
                alert("Comida adicionada com sucesso!");
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            }
        }catch(err){
            throw err;
        }
    }
    async function delComida(id,key){
        try{
            let r = await CardapioProvider.delComida(id);
            let cardapio_=cardapio;
            cardapio_.splice(key,1);
            setCardapio(cardapio_ => [...cardapio_]);
        }catch(err){
            throw err;
        }
    }
    async function edit(cid){
        if(image){
            try{
                let file = document.getElementById('img').files[0];
                let file_compress = await imageCompression(file, options);
                let reader = new FileReader();
                let img = null
                reader.readAsDataURL(file_compress);
                img=reader.result;
                reader.onload = async () => {
                    img=reader.result;
                    let comida = {
                        com_nome:nome,
                        com_desc:desc,
                        com_img:img,
                        com_preco:preco.replace(',','.')
                    }
                    let r = await CardapioProvider.editComida(cid,comida);
                    editcomidaClose();
                    alert("Comida editada com sucesso!");
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                }
            }catch(err){
                throw err;
            }
        }else{
            try{
                let comida = {
                    com_nome:nome,
                    com_desc:desc,
                    com_img:img64,
                    com_preco:preco.replace(',','.')
                }
                let r = await CardapioProvider.editComida(cid,comida);
                setCardapio(cardapio => [...cardapio, r]);
                comidaClose();
                alert("Comida editada com sucesso!");
            }catch(err){
                throw err;
            }
        }
    }
    function editComida(item){   
        setDesc(item.com_desc);
        setImage(null);
        setImg64(item.com_img);
        setNome(item.com_nome);
        setPreco(item.com_preco.toString().replace(".",","));
        setID(item.com_ID);
        editcomidaClose();
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
            <DHeader dado={{rest:rest,user:user}}/>
            <main>
                <Row>
                    <Col className="text-center">
                        <Row>
                            <Col sm="12" lg="2">
                                <Button variant="outline-success" onClick={comidaShow}>Adicionar comida</Button>
                            </Col>
                            <Row>
                                {cardapio.map((item, key) => (
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
                                                <Card.Footer>
                                                    <a className="btn btn-outline-info" onClick={()=>editComida(item)}>Editar comida</a>
                                                    <Button variant="outline-danger" onClick={()=>delComida(item.com_ID, key)}>Excluir comida</Button>
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
            <Modal show={show} onHide={comidaClose} className="fade">
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar comida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control name="nome" type="text" value={nome} onChange={(event)=>{setNome(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Preço</Form.Label>
                            <Form.Control name="preco" type="text" value={preco} onChange={(event)=>{setPreco(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control name="desc" type="text" value={desc} onChange={(event)=>{setDesc(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Foto</Form.Label>
                            <Form.File label="Image" data-browse="Buscar" custom value={image} onChange={(event)=>{setImage(event.target.value)}}/>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="success" onClick={()=>{add()}}>Adicionar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={show2} onHide={editcomidaClose} className="fade">
                <Modal.Header closeButton>
                    <Modal.Title>Editar comida</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control name="nome" type="text" value={nome} onChange={(event)=>{setNome(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Preço</Form.Label>
                            <Form.Control name="preco" type="text" value={preco} onChange={(event)=>{setPreco(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control name="desc" type="text" value={desc} onChange={(event)=>{setDesc(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Imagem</Form.Label>
                            <Form.File name="img" type="file" id="img" value={image} onChange={(event)=>{setImage(event.target.value)}} required="required"/>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="success" onClick={()=>{edit(id)}}>Salvar</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
}
export default Cardapio;