import { useState, useHistory } from "react";
import logo from "./logo.svg";
import axios from "axios";
import Box from "@mui/material/Box";
import "./App.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Stack, TextField, Typography } from "@mui/material";
import DishCard from "./Components/DishCard";
import CheckboxLabels from "./Components/CheckBox";
import { styled } from "@mui/material/styles";
import qrcode from "./assets/qrcode.jpg";
import qrcode2 from "./assets/qrcode2.jpg";

function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [value, setValue] = useState("");
  const [wantWater, setWantWater] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const [base64, setbase64] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const orderHandler = () => {
    setIsOrder(true);
  };
  const foodValue = {
    1: "กระเพาาะหมูชิ้น",
    2: "ข้าวไข่ข้น (ปูอัด/ไล้กรอก/หมูสับ/ไก่)",
    3: "(หมู/ไก่)ทอดกระเทียม",
  };

  const apiHandler = async () => {
    var result = await axios.post("/api/", {
      id: id,
      name: name,
      food: foodValue[value],
      water: wantWater,
    });
    alert(result.data.message);
  };
  const uploadHandler = async (file) => {
    if (file.target.files[0]) {
      var reader = new FileReader();
      reader.onloadend = function () {
        if (reader.result) {
          setbase64(reader.result);
        }
      };
      reader.readAsDataURL(file.target.files[0]);
    }
  };

  const Input = styled("input")({
    display: "none",
  });
  return (
    <>
      <Box sx={isOrder ? { display: "none" } : { display: "block" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl>
            <FormLabel
              id="demo-controlled-radio-buttons-group"
              sx={{
                textAlign: "center",
                fontSize: "1.5rem",
                marginY: "30px",
              }}
            >
              Select a dish
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <DishCard
                  name={"กระเพาาะหมูชิ้น"}
                  price={35}
                  children={
                    <FormControlLabel
                      value="1"
                      control={<Radio sx={{ marginLeft: "10px" }} />}
                      label="กระเพาาะหมูชิ้น"
                    />
                  }
                  image="https://1.bp.blogspot.com/-wy_EzdOuGqI/VvjCNm8Ea1I/AAAAAAAAAmY/rG5ktPHgvNgQWi1V42UGUaB7Cj1aFYl6w/s1600/%25E0%25B8%2581%25E0%25B8%25A3%25E0%25B8%25B0%25E0%25B9%2580%25E0%25B8%259E%25E0%25B8%25A3%25E0%25B8%25B2%25E0%25B8%25AB%25E0%25B8%25A1%25E0%25B8%25B9%25E0%25B8%258A%25E0%25B8%25B4%25E0%25B9%2589%25E0%25B8%2599.jpg"
                />
                <DishCard
                  name={"ข้าวไข่ข้นไล้กรอก"}
                  price={35}
                  children={
                    <FormControlLabel
                      value="2"
                      control={<Radio sx={{ marginLeft: "10px" }} />}
                      label="ข้าวไข่ข้นไล้กรอก"
                    />
                  }
                  image="https://food.mthai.com/app/uploads/2017/07/CREAMY-OMELETTE-ON-RICE.jpg"
                />
                <DishCard
                  name={"ไก่ทอดกระเทียม"}
                  price={35}
                  children={
                    <FormControlLabel
                      value="3"
                      control={<Radio sx={{ marginLeft: "10px" }} />}
                      label="ไก่ทอดกระเทียม"
                    />
                  }
                  image="https://img.wongnai.com/p/1920x0/2021/02/08/ef978a413d17470782d59e3f77fe673d.jpg"
                />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: ".25rem",
          }}
        >
          <CheckboxLabels wantWater={wantWater} setWantWater={setWantWater} />
          <TextField
            placeholder="Name"
            required
            sx={{ width: "50%", marginBottom: "12px" }}
            inputProps={{ pattern: "641305002[0-9]{2}" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            placeholder="Student ID"
            helperText="641305002XX"
            required
            value={id}
            sx={{ width: "50%", marginBottom: "12px" }}
            onChange={(e) => setId(e.target.value)}
          />

          <Button type="submit" onClick={orderHandler}>
            Order
          </Button>
        </Box>
      </Box>
      <Stack
        sx={
          !isOrder
            ? { display: "none" }
            : {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }
        }
        spacing={2}
      >
        <Typography sx={{ mt: 20 }} variant="h5">
          Subtotoal {wantWater ? "41 THB" : "35 THB"}
        </Typography>
        <img src={wantWater ? qrcode2 : qrcode} alt="" height={200} />

        <Typography variant="h6">
          PromptPay Id <b>0830365648</b>
        </Typography>
        <a
          target="_blank"
          href={
            wantWater
              ? "https://wwwii.bsthun.com/link/csc105-checkout1.php"
              : "https://wwwii.bsthun.com/link/csc105-checkout.php"
          }
        >
          <br />
          <Typography variant="h5" color="slateblue">
            Pay with debit/credit card
          </Typography>
        </a>
        {/* <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={uploadHandler}
          />
          <Button variant="contained" component="span">
            Upload Promtpay Bill
          </Button>
        </label> */}
        <Button onClick={apiHandler}>Submit</Button>
      </Stack>
    </>
  );
}

export default App;
