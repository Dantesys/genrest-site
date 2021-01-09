import React from 'react';
import './header.css';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function Header(props , {history}){
    return(
        <header>
			<Navbar className="bg-sys" expand="lg" bg="dark" variant="dark">
				<Navbar.Brand href="./">Sigmas</Navbar.Brand>
				<Navbar.Collapse id="navbar">
					<Nav className="mr-auto">
						<Nav.Link href="./">Inicio</Nav.Link>
						<Nav.Link href="./cardapio">Cardapio</Nav.Link>
					</Nav>
					<Navbar.Toggle aria-controls="navbar" />
					<Form inline>
						<Navbar.Text>
						<Button variant="outline-light" className="my-2 my-sm-0">Login<FontAwesomeIcon icon="sing-in-alt"/></Button>
						ou
						<Button variant="outline-light" className="my-2 my-sm-0">Cadastro<FontAwesomeIcon icon="sing-in-alt"/></Button>
						</Navbar.Text>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		</header>
    );
}

export default Header;