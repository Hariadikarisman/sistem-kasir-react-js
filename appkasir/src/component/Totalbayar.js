import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../utils/Constants';

export default class Totalbayar extends Component {

	submitTotalbayar = (totalBayar) => {
		const pesanan = {
			total_bayar: totalBayar,
			menus: this.props.keranjangs,
		} 

		axios
	      .post(API_URL + "pesanans", pesanan)
	        .then(res => {
	          this.props.history.push('/sukses')
	        })
	}

	render() {
		const totalBayar = this.props.keranjangs.reduce(function (result, item) {
		  return result + item.total_harga;
		}, 0);
		return (
			<>
			{/* web */}
			<div className="fixed-bottom d-none d-md-block">
				<Row>
					<Col md={{span: 3, offset: 9}} className="mb-3 px-4">
						<h4>Total Harga : <strong className="float-right">Rp. {numberWithCommas(totalBayar)}</strong> </h4>
						<Button variant="primary" block size="lg" onClick={() => this.submitTotalbayar(totalBayar)}>
							<FontAwesomeIcon icon={faShoppingCart} className="mr-3"/><strong>Bayar</strong>
						</Button>
					</Col>
				</Row>
			</div>

			{/* mobile */}
			<div className="d-sm-block d-md-none">
				<Row>
					<Col md={{span: 3, offset: 9}} className="mb-3 px-4">
						<h4>Total Harga : <strong className="float-right">Rp. {numberWithCommas(totalBayar)}</strong> </h4>
						<Button variant="primary" block size="lg" onClick={() => this.submitTotalbayar(totalBayar)}>
							<FontAwesomeIcon icon={faShoppingCart} className="mr-3"/><strong>Bayar</strong>
						</Button>
					</Col>
				</Row>
			</div>
			</>
		);
	}
}
