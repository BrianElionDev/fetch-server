import { supabase } from "../supabaseClient.js";
export const CreateNewRecord = async ({
  Video_url,
  Video_title,
  Video_transcipt,
  Channel_name,
  Publish_at,
  Llm_answer,
  Llm_summary
}) => {
  if (!Llm_answer || !Array.isArray(Llm_answer)) {
    throw new Error(
      "Expected an array in retrieve_data.results, but got something else."
    );
  }
  const answers = Array.isArray(Llm_answer) ? Llm_answer : [];
  const noTranscript = !Video_transcipt;
  const noProjects = answers.every(
    (answer) => !Array.isArray(answer?.projects) || answer.projects.length === 0
  );
  if (noTranscript && noProjects) console.log("Not transcript or projects");

  let acc = {
    channel_name: Channel_name || "",
    date: Publish_at || new Date().toISOString(),
    link: Video_url || "",
    llm_answer: Llm_answer,
    transcript: Video_transcipt || "",
    video_title: Video_title || "",
    answer:Llm_summary || "" ,
  };

  console.log(`Final Output Object: ${JSON.stringify(acc)}`);
  try {
    const response = await fetch(
      "https://crypto-lens-psi.vercel.app/api/knowledge",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(acc),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(`Server response: ${result}`);
    return { success: true, error: null };
  } catch (error) {
    console.error(`❌ Sending Data failed!: ${error}`);
    return { success: false, error: error.message };
  }
};

/* export const PlanB = async () => {
  const llm_answer = {
    projects:
      Array.isArray(item.llm_answer) && item.llm_answer[0]?.projects
        ? item.llm_answer[0].projects.map((project: RawProject) => ({
            coin_or_project: project.coin_or_project,
            marketcap: (
              project.Marketcap ||
              project.marketcap ||
              ""
            ).toLowerCase(),
            rpoints: Number(project.Rpoints || project.rpoints || 0),
            total_count: Number(
              project["Total count"] || project.total_count || 0
            ),
            category: Array.isArray(project.category) ? project.category : [],
          }))
        : [],
    total_count: Number(item.llm_answer?.[0]?.total_count || 0),
    total_rpoints: Number(
      item.llm_answer?.[0]?.total_Rpoints ||
        item.llm_answer?.[0]?.total_rpoints ||
        0
    ),
  };
}; */
