import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./mailCard";
import CardDetails from "./MailDetails/mailDetails";
import { Modal, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { fetchEmails } from "../utils/fetchEmails";
import { classifyEmail } from "../api/grow/route";
const Mails = ({ session }) => {
  const [maxMails, setMaxMails] = useState(5);
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [open, setOpen] = useState(false);
  const [classifyLoading, setClassifyLoading] = useState(false);
  const [classifyResult, setClassifyResult] = useState("");
  const [apiKey, setApiKey] = useState(
    localStorage.getItem("groq_api_key") || ""
  );

  useEffect(() => {
    fetchEmails(session, maxMails, setMails);
  }, [maxMails, session]);

  const handleCardClick = (mail) => setSelectedMail(mail);
  const handleClose = () => setSelectedMail(null);
  const handleOpen = () => setOpen(true);
  const handleClose2 = () => setOpen(false);

  const handleClassifyClick = async () => {
    if (!apiKey) {
      handleOpen();
      return;
    }

    setClassifyLoading(true);
    try {
      const classifications = [];
      for (const mail of mails) {
        const result = await classifyEmail(mail.snippet,apiKey); // Call classifyEmail function
        classifications.push(result);
      }
      setClassifyResult(classifications);
      console.log(classifyResult);
    } catch (error) {
      console.error("Error classifying emails:", error);
    } finally {
      setClassifyLoading(false);
    }
  };
  const handleSaveApiKey = () => {
    const key = document.getElementById("apiKeyInput").value;
    localStorage.setItem("groq_api_key", key);
    setApiKey(key);
    handleClose2();
  };

  return (
    <div className="bg-white p-5 mt-2 shadow-lg border-lg">
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
        className="mb-2"
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="range"
            min="1"
            max="50"
            value={maxMails}
            onChange={(e) => setMaxMails(e.target.value)}
            style={{ width: "100px", marginRight: "10px", boxShadow: "none" }}
          />
          <span>{maxMails}</span>
        </div>

        <Button
          variant="outlined"
          onClick={handleClassifyClick}
          style={{ maxWidth: "90px", fontSize: "13px", lineHeight: "1" }}
          disabled={classifyLoading}
        >
          {classifyLoading ? "Classifying..." : "Classify"}
        </Button>
      </div>

      <div
        style={{
          display: "block",
          overflowY: "auto",
          maxHeight: "500px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {mails.map((mail, index) => (
          <div onClick={() => handleCardClick(mail)} key={index}>
            <Card
              name={
                mail.payload.headers.find((header) => header.name === "From")
                  .value
              }
              description={mail.snippet}
              type={classifyResult[index]} // Assuming classifyResult is an array matching the mails array
            />
          </div>
        ))}
      </div>
      {selectedMail && (
        <CardDetails
          name={
            selectedMail.payload.headers.find(
              (header) => header.name === "From"
            ).value
          }
          description={selectedMail.snippet}
          onClose={handleClose}
        />
      )}
      <Modal
        open={open}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Please Enter Groq API Key
          </Typography>
          <input id="apiKeyInput" sx={{ m: 2 }} className="mb-2" />
          <Button onClick={handleSaveApiKey}>Enter</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default Mails;
