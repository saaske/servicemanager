import React, { useState, useEffect } from "react";
import start from "./Assets/start.png";
import stop from "./Assets/stop.png";
import restart from "./Assets/restart.png";
import greenTick from "./Assets/greentick.png";
import redCross from "./Assets/redcross.png";
import Axios from "axios";

function ServiceManger({ ServiceName, status }) {
  function onClick(action) {
    console.log("came here to kill " + ServiceName, action);
    let requestBody = {
      name: ServiceName,
      action,
    };
    Axios.post(
      "https://sandbox.monkeycap.com/v1/management/server-action",
      requestBody
    );
  }
  return (
    <div
      className="container"
      id={ServiceName}
      style={{ background: "#E8E8E8", color: "black" }}
    >
      <div style={{ maxWidth: "100px" }}>{ServiceName}</div>
      <div>
        {status === "RUNNING" ? (
          <abbr title="Running">
            <img src={greenTick} alt="stop" width="20px" height="20px" />
          </abbr>
        ) : (
          <abbr title="Stop">
            <img src={redCross} alt="stop" width="20px" height="20px" />
          </abbr>
        )}
      </div>
      <div>
        <div className="center">
          {status === "STOPPED" ? (
            <div className="p2" onClick={() => onClick("START")}>
              <abbr title="Start">
                <img src={start} alt="start" width="20px" height="20px" />
              </abbr>
            </div>
          ) : (
            <div className="p2" onClick={() => onClick("STOP")}>
              <abbr title="Stop">
                <img src={stop} alt="stop" width="20px" height="20px" />
              </abbr>
            </div>
          )}
          <div className="p2" onClick={() => onClick("RESTART")}>
            <abbr title="Restart">
              <img src={restart} alt="stop" width="20px" height="20px" />
            </abbr>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    let header = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    Axios.get(
      "https://sandbox.monkeycap.com/v1/management/servers",
      header
    ).then((resp) => {
      console.log("resp ", resp);
      if (resp.status === 200) {
        setServices(resp.data);
        setError("");
      } else {
        setError("MangangeMent serv might be Down");
      }
    });
  }, []);
  return (
    <div>
      <div className="App-header">
        <div style={{ marginTop: "10px" }}>Services Manager</div>
      </div>
      <div className="App">
        <div className="container">
          <div style={{ maxWidth: "100px", width: "100px" }}>
            <strong>Service</strong>
          </div>
          <div>
            <strong>Status</strong>
          </div>
          <div>
            <strong>Actions</strong>
          </div>
        </div>
      </div>
      {services.map((service, i) => (
        <ServiceManger
          key={i}
          ServiceName={service.name}
          status={service.status}
        />
      ))}
      {/* <ServiceManger ServiceName="Procurement" status="RUNNING" />
      <ServiceManger ServiceName="Vendor Integration" status="STOPPED" />
      <ServiceManger ServiceName="Vendor Product" status="RUNNING" /> */}
    </div>
  );
}
