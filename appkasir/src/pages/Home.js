import React, { Component } from 'react';
import Listkategori from '../component/Listkategori';
import Hasil from '../component/Hasil';
import Menus from '../component/Menus';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/Constants';
import swal from 'sweetalert';

class Home extends Component {

  constructor(props){
    super(props)
    this.state = {
      menus: [],
      kategoriDipilih: "Makanan",
      keranjangs: []
    }
  }

  componentDidMount(){
    axios
      .get(API_URL + "produk?kategori.nama="+this.state.kategoriDipilih)
        .then(res => {
          const menus = res.data;
          this.setState({ menus });
        })
        .catch(error => {
          console.log(error);
        })

    this.getListKeranjang();
  }

  // componentDidUpdate(prevState) {
  //   if(this.state.keranjangs !== prevState.keranjangs){
  //     axios
  //     .get(API_URL + "keranjangs")
  //       .then(res => {
  //         const keranjangs = res.data;
  //         this.setState({ keranjangs });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       })
  //   }
  // }

  getListKeranjang = () => {
    axios
      .get(API_URL + "keranjangs")
        .then(res => {
          const keranjangs = res.data;
          this.setState({ keranjangs });
        })
        .catch(error => {
          console.log(error);
        })
  }

  ubahKategori = (value) => {
    this.setState({
      kategoriDipilih: value,
      menus: []
    })

    axios
      .get(API_URL + "produk?kategori.nama="+value)
        .then(res => {
          const menus = res.data;
          this.setState({ menus });
        })
        .catch(error => {
          console.log(error);
        })
  }

  masukKeranjang = (value) => {

    axios
      .get(API_URL + "keranjangs?produk.id="+value.id)
        .then(res => {
          if(res.data.length === 0){
            const keranjang = {
              jumlah: 1,
              total_harga: value.harga,
              produk: value
            }

             axios
              .post(API_URL + "keranjangs", keranjang)
                .then(res => {
                  this.getListKeranjang();
                  swal({
                    title: "Good job!",
                    text: "Pesanan Anda Adalah "+keranjang.produk.nama ,
                    icon: "success",
                    button: "Tutup",
                    timer: 3000,
                  });
                })
                .catch(error => {
                  console.log(error);
                })
          } else {
            const keranjang = {
              jumlah: res.data[0].jumlah+1,
              total_harga: res.data[0].total_harga+value.harga,
              produk: value
            };

            axios
              .put(API_URL + "keranjangs/"+res.data[0].id, keranjang)
                .then(res => {
                  swal({
                    title: "Good job!",
                    text: "Pesanan Anda Adalah "+keranjang.produk.nama,
                    icon: "success",
                    button: "Tutup",
                    timer: 3000,
                  });
                })
                .catch(error => {
                  console.log(error);
                })

          }
        })
        .catch(error => {
          console.log(error);
        })
  }

  render() {
    const { menus, kategoriDipilih, keranjangs } = this.state
    return (
        <div className="mt-3">
          <div className="container-fluid">
            <Row>
              <Listkategori ubahKategori={this.ubahKategori} kategoriDipilih={kategoriDipilih}/>
              <Col className="mt-3">
                <h4>Daftar Produk</h4>
                <hr />
              <Row className="overflow-auto menu">
                {menus && menus.map((menu) => (
                  <Menus 
                    key={menu.id} 
                    menu={menu} 
                    masukKeranjang={this.masukKeranjang}
                  />
                ))}
              </Row>
              </Col>
              <Hasil keranjangs={keranjangs} {...this.props} getListKeranjang={this.getListKeranjang}/>
            </Row>
          </div>
        </div>
    );
  }
}

export default Home;