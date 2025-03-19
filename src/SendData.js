export const CreateNewRecord = async ({
  Video_url,
  Video_title,
  Video_transcipt,
  Channel_name,
  Publish_at,
  Llm_answer,
}) => {
  let acc = {};

  /* if (!Llm_answer || !Array.isArray(Llm_answer)) {
    throw new Error(
      "Expected an array in retrieve_data.results, but got something else."
    );
  } */
  const answers = Array.isArray(Llm_answer) ? Llm_answer : [];
  const noTranscript = !Video_transcipt;
  const noProjects = answers.every(
    (answer) => !Array.isArray(answer?.projects) || answer.projects.length === 0
  );
  if (noTranscript && noProjects) console.log("Not transcript or projects");

  acc = {
    channel_name: Channel_name || "",
    date: Publish_at || new Date().toISOString(),
    link: Video_url || "",
    llm_answer: answers.map((answer) => ({
      projects: Array.isArray(answer.projects)
        ? answer.projects.map((project) => ({
            coin_or_project: project.coin_or_project || "",
            Marketcap: project.Marketcap ?? null,
            Rpoints: Number(project.Rpoints) || 0,
            "Total count": Number(project["Total count"]) || 0,
            category: Array.isArray(project.category) ? project.category : [],
          }))
        : [],
      total_count: Number(answer.total_count) || 0,
      total_rpoints: Number(answer.total_rpoints) || 0,
    })),
    transcript: Video_transcipt || "",
    video_title: Video_title || "",
    answer: "Missing summary",
  };

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
    return { success: true, error: nyll };
  } catch (error) {
    console.error(`❌ Sending Data failed!: ${error}`);
    return { success: false, error: error.message };
  }
};
