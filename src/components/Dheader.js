import React from 'react';
import './Dheader.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
function DHeader(dado,{history}){
	history=useHistory();
	const { rest } = React.useState(dado.rest);
	function dashboard(){
		history.push({pathname:"/dashboard"});
	}
	function cardapio(){
		history.push({pathname:"/dashboard/cardapio"});
	}
	function mesa(){
		history.push({
			pathname:"/dashboard/mesas"});
	}
	function config(){
		history.push({pathname:"/dashboard/config"});
	}
	function logout(){
		localStorage.setItem("user",null);
		history.push({pathname:"/"});
	}
    return(
        <header>
			<Navbar className="bg-sys" expand="lg" bg="dark" variant="dark">
				<Navbar.Brand href="./">
					{rest && rest.rest_logo ? (
                        <Navbar.Brand href="./">
                            <img src={rest.rest_logo} alt="logo"/>
                        </Navbar.Brand>
                    ):(
                        <Navbar.Brand href="./">
                        </Navbar.Brand>
                    )}
				</Navbar.Brand>
				<Navbar.Collapse id="navbar">
					<Nav className="mr-auto">
						<Nav.Link onClick={dashboard}>Inicio</Nav.Link>
						<Nav.Link onClick={cardapio}>Cardapio</Nav.Link>
						<Nav.Link onClick={mesa}>Mesas</Nav.Link>
						<Nav.Link onClick={config}>Configurações</Nav.Link>
					</Nav>
					<Navbar.Toggle aria-controls="navbar" />
					<Form inline>
						<Button variant="outline-light" className="my-2 my-sm-0" onClick={logout}>Sair</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</header>
    );
}

export default DHeader;