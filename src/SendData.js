import axios from "axios";

export const CreateNewRecord = async ({
  Video_url,
  Video_title,
  Channel_name,
  Publish_at,
  Llm_answer,
}) => {
  try {
    const response = await axios.post("https://crypto-lens-psi.vercel.app/api/knowledge", 
      {
        "Video_url": Video_url,
        "Video_title": Video_title,
        "Channel_name": Channel_name,
        "Publish_at": Publish_at,
        "Llm_answer": Llm_answer,
      }, 
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });

    console.log("Record created successfully:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Error:", error);
    }
    throw error; 
  }
};
