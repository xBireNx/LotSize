import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  const storedSymbol = localStorage.getItem("symbol") || "EUR/USD";
  const storedAccountSize = localStorage.getItem("accountSize") || "0";
  const storedRiskPercentage = localStorage.getItem("riskPercentage") || "0";
  const storedStopLossPips = localStorage.getItem("stopLossPips") || "0";

  const [symbol, setSymbol] = useState(storedSymbol);
  const [accountSize, setAccountSize] = useState(storedAccountSize);
  const [riskPercentage, setRiskPercentage] = useState(storedRiskPercentage);
  const [stopLossPips, setStopLossPips] = useState(storedStopLossPips);
  const [lotSize, setLotSize] = useState(0);
  const [amtRisk, setAmtRisk] = useState(0);

  const pipValues = {
    "EUR/USD": 10,
    "USD/JPY": 6.9,
    "GBP/USD": 10,
    "USD/CHF": 11.73,
    "AUD/USD": 10,
    "USD/CAD": 7.46,
    "NZD/USD": 10,
    "EUR/CHF": 11.73,
    "EUR/JPY": 6.9,
    "XAUUSD": 1,
    "NAS100": 10,
    "SP500": 0.01,
    "US30": 0.01,
  };

  useEffect(() => {
    localStorage.setItem("symbol", symbol);
    localStorage.setItem("accountSize", accountSize);
    localStorage.setItem("riskPercentage", riskPercentage);
    localStorage.setItem("stopLossPips", stopLossPips);
  }, [symbol, accountSize, riskPercentage, stopLossPips]);

  const calculateLotSize = () => {
    if (riskPercentage > 5) {
      const pipValue = pipValues[symbol];
      const calculatedLotSize =
        (parseFloat(accountSize) * (parseFloat(riskPercentage) / 100)) /
        (parseFloat(stopLossPips) * pipValue);
      setLotSize(calculatedLotSize.toFixed(2));
      setAmtRisk((parseFloat(accountSize) * parseFloat(riskPercentage)) / 100);
      alert("Hello Gambler😂");
    } else {
      const pipValue = pipValues[symbol];
      const calculatedLotSize =
        (parseFloat(accountSize) * (parseFloat(riskPercentage) / 100)) /
        (parseFloat(stopLossPips) * pipValue);
      setLotSize(calculatedLotSize.toFixed(2));
      setAmtRisk((parseFloat(accountSize) * parseFloat(riskPercentage)) / 100);
      if (riskPercentage >= 1 && riskPercentage <= 5) {
        alert("Please use proper risk, I hope you know your risk plan.");
      }
    }
  };

  return (
    <div className="container">
      <div className="vertical-center">
        <Container className="glass" fluid>
          <h2>Lot Size Calculator</h2>
          <Form.Group controlId="symbol" className="input-field">
            <Form.Label>Currency Pair</Form.Label>
            <Form.Control
              as="select"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            >
              {Object.keys(pipValues).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="accountSize" className="input-field">
            <Form.Label>Account Size ($)</Form.Label>
            <Form.Control
              type="text"
              pattern="[0-9]*"
              value={accountSize}
              onChange={(e) => setAccountSize(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="riskPercentage" className="input-field">
            <Form.Label>Risk Percentage</Form.Label>
            <Form.Control
              type="text"
              pattern="[0-9]*"
              value={riskPercentage}
              onChange={(e) => setRiskPercentage(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="stopLossPips" className="input-field">
            <Form.Label>Stop Loss (Pips)</Form.Label>
            <Form.Control
              type="text"
              pattern="[0-9]*"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
            />
          </Form.Group>
          <div>
            <div className="button-container">
              <Button
                variant="contained"
                className="bn632-hover bn27"
                onClick={calculateLotSize}
              >
                Calculate Lot Size
              </Button>
            </div>
            {/* <div className="calculated-lot-size">
              <h3></h3>
            </div> */}
            <Row>
              <Col sm={12} md={6}>
                <div className="box">
                  <h4>
                    Risk Amount <br />${amtRisk}
                  </h4>
                </div>
              </Col>
              <br />
              <Col sm={12} md={6}>
                <div className="box">
                  <h4>
                    Lot Size:
                    <br /> {lotSize}
                  </h4>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12} md={3}>
                <div className="box">
                  <h4>
                    -1R: <br />${amtRisk}
                  </h4>
                </div>
              </Col>
              <br />
              <Col sm={12} md={3}>
                <div className="box">
                  <h4>
                    1R:
                    <br /> ${amtRisk}
                  </h4>
                </div>
              </Col>
              <Col sm={12} md={3}>
                <div className="box">
                  <h4>
                    2R: <br />${amtRisk * 2}
                  </h4>
                </div>
              </Col>
              <br />
              <Col sm={12} md={3}>
                <div className="box">
                  <h4>
                    3R:
                    <br /> ${amtRisk * 3}
                  </h4>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default App;
