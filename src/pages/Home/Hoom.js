import Layout from "../../layout/layout";
import styles from "./Hoom.module.css";
import shoesBg from "../../image/shesesbg.jpg";
import laptob from "../../image/laptop.jpg";
import natuer from "../../image/nather.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Keyboard, Pagination, Navigation } from "swiper";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import ShoesList from "../../components/shoesList/shoesList";
import { useNavigate } from "react-router-dom";
import CampSuppliesList from "../../components/campSuppliesList/campSuppliesList";

const Hoom = () => {
  return (
    <Layout>
      <main className={styles.container}>
        <SwiperComponent />
        <ShoesList styles={styles} />
        <CampSuppliesList styles={styles} />
      </main>
    </Layout>
  );
};

export default Hoom;

const SwiperComponent = () => {
  const navigate=useNavigate()
  return (
    <Swiper
      style={{
        "--swiper-pagination-color": "#fff",
      }}
      slidesPerView={1}
      spaceBetween={30}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
      }}
      loop={true}
      speed={600}
      navigation={{
        nextEl: ".button-text-slide",
        prevEl: ".button-prev-slide",
      }}
      modules={[Autoplay, Keyboard, Pagination, Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <section className={styles.bgShoes} onClick={()=>navigate('/shoes')}>
          <h2>Shoes</h2>
          <img src={shoesBg} alt="shoesBg" />
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className={styles.bgShoes}  onClick={() => navigate("/campSupplies")}>
          <h2>natuer</h2>
          <img src={natuer} alt="HardBg" />
        </section>
      </SwiperSlide>
      <SwiperSlide>
        <section className={styles.bgShoes}>
          <h2>Laptab</h2>
          <img src={laptob} alt="laptopBg" />
        </section>
      </SwiperSlide>
      <div className="button-prev-slide">
        <FaChevronLeft />
      </div>
      <div className="button-text-slide">
        <FaChevronRight />
      </div>
    </Swiper>
  );
};
