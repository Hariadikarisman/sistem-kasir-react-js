import React, { Component } from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';

const Menus = ({ menu, masukKeranjang }) => {
	return(
		<Col md={4} xs={6} className="mb-3 ">
			<Card className="shadow">
				<Card.Img variant="top" style={{ height: '250px'}} src={"assets/images/" + menu.kategori.nama + "/" + menu.gambar}/>
	   		    <Card.Body>
			    <Card.Title>{menu.nama}</Card.Title>
				    <Card.Text>
    				    Harga : Rp. {numberWithCommas(menu.harga)}
				    </Card.Text>
				<Button variant="primary" onClick={() => masukKeranjang(menu)}>Pesan</Button>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default Menus;