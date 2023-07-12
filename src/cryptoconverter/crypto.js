import { Card, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import "./crypto.css";
import { FcCurrencyExchange } from 'react-icons/fc';

function Crypto() {
    const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";
    const leftSelectedValue = "Bitcoin";
    const rightSelectedValue = "Ether";

  const [cryptoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [leftSelect, setLeftSelect] = useState(leftSelectedValue);
  const [rightSelect, setRightSelect] = useState(rightSelectedValue);
  const [result, setResult] = useState("0");
  

  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();

    const data = jsonData.rates;
    const tempArray = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        lable: item[1].name,
        rate: item[1].value,
      };
    });
    setCryptoList(tempArray);
  }

  useEffect(() => {

    if(cryptoList.length === 0) return;

        const leftSelectRate = cryptoList.find((item) => {
            return item.value === leftSelect
        }).rate
        const rightSelectRate = cryptoList.find((item) => {
            return item.value === rightSelect
        }).rate
        
        const resultValue = (inputValue * rightSelectRate) / leftSelectRate ;

        setResult(resultValue.toFixed(5));

  },[inputValue, leftSelect, rightSelect])

  return (
    <div>
      <div id="container">
        <Card
          className="card"
          title={<h1><FcCurrencyExchange/> Crypto-Converter</h1>}
          bordered={true}
          style={{
            width: 500,
          }}
        >
          <Form>
            <Form.Item>
              <Input onChange={(event) => setInputValue(event.target.value)}/>
              {/* <InputNumber className="input-number" /> */}
              <div className="flex-box">
                <Select
                  style={{ width: "45%" }}
                  defaultValue={leftSelectedValue}
                  options={cryptoList}
                  onChange={(value) => setLeftSelect(value)}
                ></Select>
                <Select
                  style={{ width: "45%" }}
                  defaultValue={rightSelectedValue}
                  options={cryptoList}
                  onChange={(value) => setRightSelect(value)}
                ></Select>
              </div>
              <p className="para">{inputValue} {leftSelect} = {result} {rightSelect}</p>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default Crypto;
