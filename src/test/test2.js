import { supabase } from "../../supabaseClient.js";
import { makeLlmPrompt } from "../Llm.js";
import { LLMFactory } from "../llm/factory.js";

async function fetchKnowledge() {
  const { data, error } = await supabase
    .from("knowledge")
    .select("*")
    .eq("hasUpdatedTranscript", false);

  if (error) {
    console.error("Error fetching knowledge:", error);
    return [];
  }
  return data;
}

async function updateKnowledge({ analysis, summary, link, usage }) {
  analysis = JSON.parse(analysis);
  summary = JSON.parse(summary);

  const llm_answer = {
    projects:
      Array.isArray(analysis) && analysis[0]?.projects
        ? analysis[0].projects.map((project) => ({
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
    total_count: Number(analysis[0]?.total_count || 0),
    total_rpoints: Number(
      analysis[0]?.total_Rpoints || analysis[0]?.total_rpoints || 0
    ),
  };
  const { data, error } = await supabase
    .from("knowledge")
    .update({
      hasUpdatedTranscript: true,
      usage: usage,
      llm_answer: llm_answer,
      summary: summary,
    })
    .eq("link", link);

  if (error) {
    console.error("Error updating knowledge:", error);
    return null;
  }
  return data;
}

export const makeAnalysisBat = async () => {
  const data = await fetchKnowledge();
  console.log(`Starting Analysis for ${data.length} items`);

  for (const item of data) {
    console.log(`Processing item with link: ${item.link}`);

    try {
      const { analysis, summary, usage } = await makeLlmPrompt({
        model: "grok",
        transcript: item.corrected_transcript,
      });
      await updateKnowledge({
        link: item.link,
        analysis: JSON.stringify(analysis),
        summary: JSON.stringify(summary),
        usage: usage,
      });
      console.log(`Successfully processed item: ${item.link}`);
    } catch (error) {
      console.error(`Error processing item ${item.link}:`, error);
    }
  }

  console.log("Analysis completed for all items");
};

makeAnalysisBat();
