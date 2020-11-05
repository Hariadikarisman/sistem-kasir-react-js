import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { API_URL } from '../utils/Constants';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCheese, faUtensils } from '@fortawesome/free-solid-svg-icons';

const Icons = ({nama}) => {
	if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
	if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2" />
	if(nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="mr-2" />
}

class Listkategori extends Component {
	constructor(props){
		super(props)
		this.state = {
			kategoris: []
		}
	}

	componentDidMount(){
		axios
		  .get(API_URL + "kategori")
	      .then(res => {
	        const kategoris = res.data;
	        this.setState({ kategoris });
	      })
	      .catch(error => {
	      	console.log(error);
	      })
	}

	render() {
		const {kategoris} = this.state
		const {ubahKategori, kategoriDipilih} = this.props
		return (
			<Col md={2} className="mt-3">
				<h4>List Kategori</h4>
				<hr />
					<ListGroup>
						{kategoris && kategoris.map((kategori) => (
						  <ListGroup.Item key={kategori.id} onClick={() => ubahKategori(kategori.nama)} className={kategoriDipilih == kategori.nama && "kategori-aktif"} style={{cursor: 'pointer'}}>
						  	<Icons nama={kategori.nama} />{kategori.nama}
						  </ListGroup.Item>
						))}
					</ListGroup>
			</Col>
		);
	}
}

export default Listkategori;