import { supabase } from "../supabaseClient.js";
import { checkIfShort } from "./CheckVideoType.js";
import { matchCoins } from "./LoadCoinsData.js";
import { formatValidatedData, getOffsetTimestamps } from "./utils.js";

// Type definitions (for reference)
/**
 * @typedef {Object} Project
 * @property {string} coin_or_project
 * @property {string} [marketcap]
 * @property {number} [rpoints]
 * @property {number} [total_count]
 * @property {string[]} [category]
 */

/**
 * @typedef {Object} LlmAnswer
 * @property {Project[]} projects
 * @property {number} total_count
 * @property {number} total_rpoints
 */

export const CreateNewRecord = async ({
  Video_url,
  Video_title,
  Video_transcipt,
  Channel_name,
  Publish_at,
  Llm_answer,
  Llm_summary,
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
    answer: Llm_summary || "",
    video_type: await checkIfShort(Video_url),
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
    console.log(
      "Success: Item: " + Video_title + " " + Video_url + " " + Channel_name
    );
    return { success: true, error: null };
  } catch (error) {
    console.log(
      "Error: Item: " + Video_title + " " + Video_url + " " + Channel_name
    );
    console.error(`❌ Sending Data failed!: ${error}`);

    return { success: false, error: error.message };
  }
};

export const CreateNewRecordTest = async ({
  Video_url,
  Video_title,
  Video_transcipt,
  Video_corrected_Transcript,
  Channel_name,
  Usage,
  Publish_at,
  Llm_answer,
  Llm_summary,
  Model,
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
  let llm_answer = {
    projects:
      Array.isArray(Llm_answer) && Llm_answer[0]?.projects
        ? Llm_answer[0].projects.map((project) => ({
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
            timestamps: Array.isArray(project.Timestamps)
              ? getOffsetTimestamps(project?.Timestamps)
              : [],
          }))
        : [],
    total_count: Number(Llm_answer[0]?.total_count || 0),
    total_rpoints: Number(
      Llm_answer[0]?.total_Rpoints || Llm_answer[0]?.total_rpoints || 0
    ),
  };

  //llm_answer = await matchCoins(llm_answer);
  console.log("Formatted obj: " + JSON.stringify(llm_answer));
  const cleanedData = {
    date: Publish_at || new Date().toISOString(),
    ["channel name"]: Channel_name || "",
    corrected_transcript: Video_corrected_Transcript || "",
    transcript: Video_transcipt || "",
    video_title: Video_title || "",
    link: Video_url || "",
    summary: Llm_summary,
    usage: Usage || 0.01,
    llm_answer: JSON.parse(JSON.stringify(llm_answer)),
    video_type: await checkIfShort(Video_url),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  try {
    console.log("Cleaned data: " + JSON.stringify(cleanedData));
    const { error } = await supabase
      .from("knowledge")
      .insert({ ...cleanedData });

    if (error) {
      console.log("Error: " + JSON.stringify(error));
    }
    console.log(
      "Success: Item: " + Video_title + " " + Video_url + " " + Channel_name
    );
    return { success: true, error: null };
  } catch (error) {
    console.log(
      "Error: Item: " + Video_title + " " + Video_url + " " + Channel_name
    );
    console.error(`❌ Sending Data failed!: ${error}`);

    return { success: false, error: error.message };
  }
};
export const UpdateCoinsWithValidatedData = async (analysis, link) => {
  analysis = JSON.parse(analysis);
  if (!analysis || !Array.isArray(analysis) || link == "") {
    throw new Error(
      "Expected an analysis and youtube link, but got something else."
    );
  }
  const updatedLlmAnswer = await formatValidatedData(analysis, link);

  //analysis = await matchCoins(analysis);
  console.log("Formatted obj: " + JSON.stringify(updatedLlmAnswer));

  try {
    const { error } = await supabase
      .from("knowledge")
      .update({ llm_answer: updatedLlmAnswer })
      .eq("link", link);

    if (error) {
      console.log("Error: " + JSON.stringify(error));
    }
    console.log(
      "Success: Item: " + Video_title + " " + Video_url + " " + Channel_name
    );
    return { success: true, error: null };
  } catch (error) {
    console.error(`❌ Sending Data failed!: ${error}`);
    return { success: false, error: error.message };
  }
};

export const CreateNewRecordBatch = async ({ data, model }) => {
  for (const item of data) {
    await CreateNewRecordTest({
      Video_url: item.link,
      Video_title: item.video_title,
      Video_transcipt: item.transcript,
      Channel_name: item["channel name"],
      Publish_at: item.date,
      Llm_answer: item.llm_answer,
      Llm_summary: item.summary,
      Model: model,
    });
  }
  return { success: true, error: null };
};

export const CreatOrUpdateRecord = async ({ data, model }) => {
  try {
    for (const item of data) {
      // Validate required fields
      if (!item.data || !item.analysis || !item.summary) {
        throw new Error("Missing required data fields");
      }

      // Transform llm_answer to match database structure
      let llm_answer = {
        projects:
          Array.isArray(item.analysis) && item.analysis[0]?.projects
            ? item.analysis[0].projects.map((project) => ({
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
                category: Array.isArray(project.category)
                  ? project.category
                  : [],
              }))
            : [],
        total_count: Number(item.analysis[0]?.total_count || 0),
        total_rpoints: Number(
          item.analysis[0]?.total_Rpoints ||
            item.analysis[0]?.total_rpoints ||
            0
        ),
      };
      llm_answer = await matchCoins(llm_answer);

      // Check if record exists
      const { data: existingData, error: fetchError } = await supabase
        .from("tests")
        .select("*")
        .eq("link", item.data.link)
        .eq("model", model);

      if (fetchError) {
        console.error("Error fetching existing data:", fetchError);
        continue; // Skip this item and continue with the next
      }

      // Clean and prepare the data
      const cleanedData = {
        date: item.data.date || new Date().toISOString(),
        transcript: item.data.transcript,
        video_title: item.data.video_title,
        "channel name": item.data["channel name"],
        link: item.data.link,
        model: model,
        summary: item.summary,
        llm_answer: JSON.parse(JSON.stringify(llm_answer)), // Ensure clean JSON
        video_type: item.data.video_type,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      try {
        if (existingData && existingData.length > 0) {
          // Update existing record
          const { error: updateError } = await supabase
            .from("tests")
            .update(cleanedData)
            .eq("link", item.data.link)
            .eq("model", model);

          if (updateError) {
            console.error("Error updating data:", updateError);
            continue;
          }
        } else {
          // Insert new record
          const { error: insertError } = await supabase
            .from("tests")
            .insert(cleanedData);

          if (insertError) {
            console.error("Error inserting data:", insertError);
            console.error("Failed data:", cleanedData);
            continue;
          }
        }

        console.log(`Successfully processed: ${item.data.video_title}`);
      } catch (error) {
        console.error("Error processing item:", error);
        console.error("Failed item:", item.data.video_title);
      }
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Fatal error in CreatOrUpdateRecord:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
