import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./mailCard";
import CardDetails from "./MailDetails/mailDetails";
import { Modal, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const Mails = ({ session }) => {
  const [maxMails, setMaxMails] = useState(5);
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [classifyLoading, setClassifyLoading] = useState(false);
  const [classifyResult, setClassifyResult] = useState("");

  useEffect(() => {
    async function fetchEmails() {
      try {
        const response = await axios.get(
          `https://gmail.googleapis.com/gmail/v1/users/${session.user.email}/messages`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            params: {
              maxResults: maxMails,
            },
          }
        );

        const fetchedMails = [];

        for (const message of response.data.messages) {
          try {
            const res2 = await axios.get(
              `https://gmail.googleapis.com/gmail/v1/users/${session.user.email}/messages/${message.id}`,
              {
                headers: {
                  Authorization: `Bearer ${session.accessToken}`,
                },
              }
            );
            fetchedMails.push(res2.data);
          } catch (error) {
            console.error(`Error fetching message ${message.id} data:`, error);
          }
        }
        setMails(fetchedMails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    }

    fetchEmails();
  }, [maxMails, session]);

  const handleCardClick = (mail) => {
    setSelectedMail(mail);
  };

  const handleClose = () => {
    setSelectedMail(null);
  };

  const handleOpen = () => setOpen(true);
  const handleClose2 = () => setOpen(false);
  const handleClassifyClick = async () => {
    const api = localStorage.getItem("openai_api_key");
    if (!api) {
      handleOpen();
    } else {
      setClassifyLoading(true);
      try {
        const snippets = mails.map((mail) => mail.snippet);
        const response = await axios.post(
          "https://api.openai.com/v1/classifications",
          {
            model: "text-categorization",
            query: snippets,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${api}`,
            },
          }
        );
        setClassifyResult(response.data);
      } catch (error) {
        console.error("Error classifying emails:", error);
      } finally {
        setClassifyLoading(false);
      }
    }
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
            Please Enter Open AI api key
          </Typography>
          <input id="modal-modal-description" sx={{ m: 2 }} className="mb-2" />
          <button>Enter</button>
        </Box>
      </Modal>
    </div>
  );
};

export default Mails;
