import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";
import { products } from "../../data";
import styles from"./ShoesFilter.module.css";
import { useTheme } from "../../provider/themeMode";
function valuetext(value) {
  return `${value}°C`;
}
const ShoesFilter = ({ setFilteredProducts,slicePricucts }) => {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState([0, 300]);
  const theme=useTheme()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    let result = slicePricucts||products.shoes;
    result = search(result);
    result = rengePrice(result);
    setFilteredProducts(result);
  }, [inputValue, value]);
  const sercchHandler = (e) => {
    setInputValue(e.target.value);
  };
  const search = (result) => {
    return result.filter((p) =>
      p.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const rengePrice = (result) => {
    const chenge = result.filter((p) => p.price < value[1]);
    return chenge.filter((p) => p.price > value[0]);
  };
  return (
    <div className={styles.productControlFilter} id={styles[theme]}>
      <input
        type="text"
        value={inputValue}
        onChange={sercchHandler}
        placeholder="search for ..."
      />
      <div>
        <h3 style={{marginLeft:"2rem"}}>more filter</h3>
        <div className={styles.productControlPrice}>
          <Box sx={{ width: 180 }}>
            <Slider
              max={300}
              min={0}
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
            />
          </Box>
          <div className={styles.productPrice}>
            <p>minPrice : $ {value[0]}</p>
            <p>maxPrice : $ {value[1]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoesFilter;
