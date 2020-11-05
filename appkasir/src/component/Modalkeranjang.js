import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { numberWithCommas } from '../utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Modalkeranjang = ({showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit, totalHarga, hapusPesanan}) => {
	if(keranjangDetail){
		return (
		<Modal show={showModal} onHide={handleClose}>
			<Modal.Header closeButton>
				          <Modal.Title>
				          	{keranjangDetail.produk.nama} {" "}
				          	<strong>
				          		Rp. {numberWithCommas(keranjangDetail.produk.harga)} 
				          	</strong>
				          </Modal.Title>
				        </Modal.Header>
				        <Modal.Body>
				        	<Form onSubmit={handleSubmit}>
							  <Form.Group controlId="exampleForm.ControlInput1">
							    <Form.Label>Total Harga</Form.Label>
							    <p><strong>Rp. {numberWithCommas(totalHarga)}</strong></p>
							  </Form.Group>

							  

							  <Form.Group controlId="exampleForm.ControlInput1">
							    <Form.Label>Jumlah : </Form.Label><br/>
							    <Button variant="primary" size="sm" className="mr-3 ml-3" onClick={() => kurang()}>
							    	<FontAwesomeIcon icon={faMinus}/>
							    </Button>
							    <strong>{jumlah}</strong>
							    <Button variant="primary" size="sm" className="mr-3 ml-3" onClick={() => tambah()}>
							    	<FontAwesomeIcon icon={faPlus}/>
							    </Button>
							  </Form.Group>



							  <Form.Group controlId="exampleForm.ControlTextarea1">
							    <Form.Label>Keterangan</Form.Label>
							    <Form.Control as="textarea" rows={3} name="keterangan" placeholder="example: pedas, micin" value={keterangan} onChange={(event) => changeHandler(event)} />
							  </Form.Group>
							  <Button variant="primary" type="submit">
							  	Simpan Pesanan
							  </Button>
							</Form>
				        </Modal.Body>
				        <Modal.Footer>
				          <Button variant="danger" onClick={() => hapusPesanan(keranjangDetail.id)}>
				            <FontAwesomeIcon icon={faTrash}/> Hapus Pesanan
				          </Button>
				        </Modal.Footer>
				      </Modal>
		);
	} else {
		return (
		<Modal show={showModal} onHide={handleClose}>
			<Modal.Header closeButton>
				          <Modal.Title>Kosong</Modal.Title>
				        </Modal.Header>
				        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				        <Modal.Footer>
				          <Button variant="secondary" onClick={handleClose}>
				            Close
				          </Button>
				          <Button variant="primary" onClick={handleClose}>
				            Save Changes
				          </Button>
				        </Modal.Footer>
				      </Modal>
	);
	}
}

export default Modalkeranjang;
