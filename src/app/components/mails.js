import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./mailCard";
import CardDetails from "./MailDetails/mailDetails";

const Mails = ({ session }) => {
  const [maxMails, setMaxMails] = useState(5);
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);

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
            console.log("Message data:", res2.data);
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
    console.log("selectedMail clicked");
    setSelectedMail(mail);
  };

  const handleClose = () => {
    setSelectedMail(null);
  };

  const handleClassifyClick = () => {
    console.log("Classify button clicked");
    // Add your classify logic here
  };

  return (
    <div className="bg-white p-5 mt-2 shadow-lg border-lg">
      <div style={{ display: "flex", justifyContent: "space-between" }} className="mb-2">
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="range"
            min="1"
            max="50"
            value={maxMails}
            onChange={(e) => setMaxMails(e.target.value)}
            style={{ width: "100px", marginRight: "10px", boxShadow:'none' }}
          />
          <span>{maxMails}</span>
        </div>

        <button
          onClick={handleClassifyClick}
          style={{
            maxWidth: '90px',
            fontSize: "13px",
            lineHeight: "1",
            boxShadow: "none",
            cursor: "pointer",
          }}
        >
          Classify
        </button>
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
        <style>
          {`
            ::-webkit-scrollbar {
                display: none;
            }
        `}
        </style>
        {mails.map((mail, index) => {
          const headers = mail.payload.headers;
          const fromHeader = headers.find((header) => header.name === "From");
          const cardName = fromHeader ? fromHeader.value : "Unknown Sender";
          return (
            <div onClick={() => handleCardClick(mail)} key={index}>
              <Card name={cardName} description={mail.snippet} />
            </div>
          );
        })}
      </div>
      {selectedMail && (
        <CardDetails
          name={selectedMail.payload.headers.find((header) => header.name === "From").value}
          description={selectedMail.snippet}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Mails;
