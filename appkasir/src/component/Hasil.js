import React, { Component } from 'react';
import { Col, ListGroup, Row, Badge, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import Totalbayar from '../component/Totalbayar';
import Modalkeranjang from '../component/Modalkeranjang';
import axios from 'axios';
import { API_URL } from '../utils/Constants';
import swal from 'sweetalert';

class Hasil extends Component {
	constructor(props){
		super(props)
		this.state = {
			showModal: false,
			keranjangDetail: false,
			jumlah: 0,
			keterangan: "",
			totalHarga: 0
		}
	}

	handleShow = (menuKeranjang) => {
		this.setState({
			showModal: true,
			keranjangDetail: menuKeranjang,
			jumlah: menuKeranjang.jumlah,
			keterangan: menuKeranjang.keterangan,
			totalHarga: menuKeranjang.total_harga
		})
	}
       
	handleClose = () => {
		this.setState({
			showModal: false
		})
	}

	tambah = () => {
		this.setState({
			jumlah: this.state.jumlah + 1,
			totalHarga: this.state.keranjangDetail.produk.harga * (this.state.jumlah + 1)
		})
	}

	kurang = () => {
		if(this.state.jumlah !== 1){
			this.setState({
				jumlah: this.state.jumlah - 1,
				totalHarga: this.state.keranjangDetail.produk.harga * (this.state.jumlah - 1)
			})
		}
	}

	changeHandler = (event) => {
		this.setState({
			keterangan: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.handleClose();
		const data = {
              jumlah: this.state.jumlah,
              total_harga: this.state.totalHarga,
              produk: this.state.keranjangDetail.produk,
              keterangan: this.state.keterangan
            }

             axios
              .put(API_URL + "keranjangs/"+this.state.keranjangDetail.id, data)
                .then(res => {
                  this.props.getListKeranjang();
                  swal({
                    title: "Update Pesanan",
                    text: "Pesanan Anda Sudah Diupdate "+data.produk.nama ,
                    icon: "success",
                    button: "Tutup",
                    timer: 3000,
                  });
                })
                .catch(error => {
                  console.log(error);
                })
	}

	hapusPesanan = (id) => {
		this.handleClose();

             axios
              .delete(API_URL + "keranjangs/"+id)
                .then(res => {
                	this.props.getListKeranjang();
                  swal({
                    title: "Hapus Pesanan",
                    text: "Pesanan Anda Sudah Dihapus "+ this.state.keranjangDetail.produk.nama,
                    icon: "error",
                    button: "Tutup",
                    timer: 3000,
                  });
                })
                .catch(error => {
                  console.log(error);
                })
	}

	render() {
		const { keranjangs } = this.props;
		return (
			<Col md={3} className="mt-3">
				<h4>Hasil Belanja</h4>
				<hr />
				{keranjangs.length !== 0 && (
					<Card className="overflow-auto hasil">
					<ListGroup variant="flush">
					  {keranjangs.map((menuKeranjang) => (
					  		<ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
					  		<Row>
						  		<Col xs={2}>
						  			<h4><Badge variant="success">{menuKeranjang.jumlah}</Badge></h4>
						  		</Col>
						  		<Col>
						  			<h5>{menuKeranjang.produk.nama}</h5>
						  			<p>Rp. {numberWithCommas(menuKeranjang.produk.harga)}</p>
						  			<p className="text-muted"> Ket : {menuKeranjang.keterangan}</p>
						  		</Col>
						  		<Col>
						  			<b className="float-right">Rp. {numberWithCommas(menuKeranjang.total_harga)}</b>
						  		</Col>
						  	</Row>
					  		</ListGroup.Item>
					  ))}
					  <Modalkeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan}/>
					</ListGroup>
					</Card>
				)}
				<Totalbayar keranjangs={keranjangs} {...this.props}/>
			</Col>
		);
	}
}

export default Hasil;
