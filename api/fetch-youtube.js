import axios from "axios";

async function fetchYoutube() {
  const response = await axios.get(
    "https://fetch-server-production.up.railway.app/api/youtube/new",
    {
      params: {
        channelId: "UCKQvGU-qtjEthINeViNbn6A",
        key: "AIzaSyAbEgk0HUGGR5QRN-oGTnDbktemUu_DEX0",
        publishedAfter: "2022-01-01T00:00:00Z",
        publishedBefore: "2024-01-01T00:00:00Z",
      },
    }
  );
  console.log("Response: " + JSON.stringify(response.data));
}
fetchYoutube();
