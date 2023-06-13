import React, { useEffect } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import "../style/about.css";

function AboutPage() {

  useEffect(() => {
    const aboutContainer = document.querySelector(".about-container");
    aboutContainer.classList.add("animate");
  }, []);

  return (

    <Container>
      <div className="about-container mt-5">
        
        <Row className="mt-4">
          <Col>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Perawatan Terbaik</Card.Title>
                <Card.Text>
                  Di Zoepy Petshop, kami mengabdikan diri untuk menyediakan perawatan terbaik bagi hewan peliharaan Anda. Dengan tim ahli yang penuh kasih sayang dan berpengalaman, kami memastikan bahwa setiap hewan yang masuk ke toko kami diberikan perhatian dan cinta yang pantas.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Produk Berkualitas</Card.Title>
                <Card.Text>
                  Kami mengerti bahwa hewan peliharaan adalah bagian tak terpisahkan dari keluarga Anda. Oleh karena itu, kami menyediakan produk berkualitas tinggi, mulai dari makanan hingga perlengkapan, untuk memenuhi kebutuhan harian mereka. Apakah Anda membutuhkan makanan kucing yang lezat atau mainan anjing yang menghibur, Zoepy Petshop adalah tempatnya!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="custom-card">
              <Card.Body>
                <Card.Title>Jasa Grooming Profesional</Card.Title>
                <Card.Text>
                  Selain itu, kami juga menawarkan jasa grooming profesional untuk membuat hewan peliharaan Anda terlihat dan merasa segar sepanjang waktu. Dengan memperhatikan detail terkecil, kami menciptakan pengalaman pemandian yang menyenangkan dan nyaman bagi hewan kesayangan Anda.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <p>
          Di Zoepy Petshop, kami juga berkomitmen untuk mendukung adopsi hewan. Kami bekerja sama dengan organisasi penampungan hewan setempat untuk membantu hewan yang membutuhkan rumah baru. Jadi, jika Anda mencari teman sejati untuk menemani hari-hari Anda, jangan ragu untuk datang dan mengunjungi kami.
        </p>
        <p>
          Kami mengucapkan terima kasih atas kepercayaan Anda kepada Zoepy Petshop sebagai pilihan utama untuk semua kebutuhan hewan peliharaan Anda. Kami berjanji untuk terus memberikan pelayanan yang terbaik dan menciptakan pengalaman berbelanja yang tak terlupakan. Bersama-sama, kita bisa menciptakan dunia yang lebih baik bagi hewan peliharaan kita tercinta.
        </p>
        <h3>Zoepy Petshop - Tempat di mana kasih sayang dan kebahagiaan hewan peliharaan berada dalam genggaman tangan Anda.</h3>
      </div>
    </Container>

  );
}

export default AboutPage;
