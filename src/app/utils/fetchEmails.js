import axios from 'axios';

export async function fetchEmails(session, maxMails, setMails) {
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
