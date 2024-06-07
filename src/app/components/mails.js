import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mails = ({ maxMails, session }) => {
  // Define state variables for storing the fetched mail data
  const [mails, setMails] = useState([]);

  // Define a useEffect hook to fetch mail data when the component mounts or updates
  useEffect(() => {
    // Define an async function to fetch mail data
    async function fetchEmails() {
      try {
        // Send a GET request to the Gmail API to fetch mail data
        const response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${session.user.email}/messages`, {
          // Provide authorization headers using the accessToken from the session object
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          // Specify query parameters for the request, such as maxResults
          params: {
            maxResults: maxMails,
          },
        });

        // Initialize an empty array to store the fetched mail data
        const fetchedMails = [];

        // Iterate through each message in the response data
        for (const message of response.data.messages) {
          try {
            // Send a GET request to fetch individual message data
            const res2 = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/${session.user.email}/messages/${message.id}`, {
              // Provide authorization headers using the accessToken from the session object
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            });
            // Log the fetched message data to the console
            console.log('Message data:', res2.data);
            // Push the fetched message data into the fetchedMails array
            fetchedMails.push(res2.data);
            // Here, you can process the individual message data if needed
          } catch (error) {
            // Log any errors that occur during message data fetching
            console.error(`Error fetching message ${message.id} data:`, error);
          }
        }
        // Set the state variable mails to the fetched mail data array
        setMails(fetchedMails);
      } catch (error) {
        // Log any errors that occur during email fetching
        console.error('Error fetching emails:', error);
      }
    }

    // Call the fetchEmails function to initiate email fetching when the component mounts or updates
    fetchEmails();
  }, [maxMails, session]); // Define dependencies for the useEffect hook

  // Render the fetched mail data in a table
  return (
    <div>
      <h2>Email Messages</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {mails.map((mail, index) => (
            <tr key={index}>
              <td>{mail.date}</td>
              <td>{mail.from}</td>
              <td>{mail.to}</td>
              <td>{mail.subject}</td>
              <td>{mail.snippet}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Mails;
