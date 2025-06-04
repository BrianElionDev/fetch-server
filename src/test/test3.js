const llmProvider = LLMFactory.createProvider("openai");
const analysisMessagesScreenshot = [
  {
    role: "system",
    content: `You are an intelligent ai agent. You task is to validate if a crypto coin appears in a content block.
        ##IMPORTANT:
        You are checking a the coin from the transcript against a coins from a screenshot: 
           Coin: A coin you are trying to check for.
          Screenshot: (Screenshot content contains text content from the screenshot ).
        `,
  },
  {
    role: "user",
    content: `
    ##Instructions
    1. Your task is to verify if a coin exists in the screenshot content.
    2. If the coin exists the on the screenshot content return true, If it does not then return false. Also Identify if the coin was wrongly identified.
    3. In some cases the coin might be correct but missing the symbols, identify as true.
    4. In some cases the coin symbol might be provided use it to validate.
    5. The coin might be incomplete like "pixels" for "pixels online" if pixels online is in the content the recognize as valid.
    6. For a valid match it does not need to match even the symbol, if the name is same then it is valid.
    7. Identify closest match to the coin checking from the list. At times the coin checking may be wrong. The true data is  on the content.
    8. At times the match might be not close, try to infer which coin was wrongly picked.
    9. The content of the text is the most accurate record. 
    ##Task
    ${transcriptContent.projects
      .map(
        (project) => `
      Coin: ${project.coin_or_project?.replace(/_/g, " ")},
      Screenshot : ${screenshotContent.projects
        .filter((proj) => proj.coin_or_project == project.coin_or_project)
        .map((proj) => proj.content)}
    `
      )
      .join("\n")}

  #Output format: The output format should be: 

  [{
    "coin": "",
    "valid: true or false depending on if it is valid (IMPORTANT, IF THE COIN IS IN THE SCREENSHOT CONTENT THE IT IS VALID),
    "possible_match": "This is a coin which is available in the screenshot content or it is close to the one we are looking for. A coin can be pronounced wrongly in the content, try to anticipate this errors. In some cases the coin to be matched may be mistakenly identified. If there coin is not valid then indicate here the text in the content section which is close to the coin we are checking for. IMPORTANT: No comment, Just name the possible match. If no close match the return "none".  "
    "found_in": "This where the possible_match was found in. If it was in the screenshot content then indicate 'screenshot', if it is not in either then indicate 'none'"
  }] 
    `,
  },
];
//const crypto_coins_local = await loadData();

const analysisMessagesTranscript = [
  {
    role: "system",
    content: `You are an intelligent ai agent. You task is to validate if a crypto coin appears in a content block.
        ##IMPORTANT:
        You are checking a the coin from the transcript against a coins from a screenshot: 
           Coin: A coin you are trying to check for.
           Transcript: (A chunk of the transcript where a coin is mentioned)
        `,
  },
  {
    role: "user",
    content: `
    ##Instructions
    1. Your task is to verify if a coin exists either in the the trancript content or in the screenshot content.
    2. IMPORTANT For a coin to be valid it you have to know it.
    2. If the coin exists the on either the screenshot or the transcript content return true, If it does not then return false. Also Identify if the coin was wrongly identified.
    3. In some cases the coin might be correct but missing the symbols, identify as true.
    3. In some cases the coin symbol might be provided use it to validate.
    5. You are to crosscheck coins you dont know from a local list of coins from coin gecko. 
    4. The coin might be incomplete like "pixels" for "pixels online" if pixels online is in the content the recognize as valid.
    5. For a valid match it does not need to match even the symbol, if the name is same then it is valid.
    3. Identify closest match to the coin checking from the list. At times the coin checking may be wrong. The true data is  on the content.
    4. At times the match might be not close, try to infer which coin was wrongly picked.
    6. Analyse also the context the coin was mentioned, if it was not to refer to the coin then the coin is not valid.
    3. The content of the text is the most accurate record. 
    ##Task
  
    ${transcriptContent.projects
      .map(
        (project) => `
      Coin: ${project.coin_or_project?.replace(/_/g, " ")},
      Content: ${project.transcript_content}
    `
      )
      .join("\n")}

  #Output format: The output format should be: 

  [{
    "coin": "",
    "valid: true or false depending on if it is valid, if the context of the coin mention does not refer to it then the coin is invalid.
    "possible_match": "This is a coin which is available in the transcript content and it is close to the one we are looking for.Use the content to verify if the coin available not the use the coin from the transcript. A coin can be pronounced wrongly in the content, try to anticipate this errors. In some cases the coin to be matched may be mistakenly identified. If there coin is not valid then indicate here the text in the content section which is close to the coin we are checking for. IMPORTANT: No comment, Just name the possible match. If no close match the return "none".  "
    "found_in": "This where the possible_match was found in. If in the transcript content then indicate 'trascript' if it is not in either then indicate 'none'"
  }]
    
    `,
  },
];

const [screenshotResponse, transcriptResponse] = await Promise.all([
  llmProvider.makeRequest(analysisMessagesScreenshot),
  llmProvider.makeRequest(analysisMessagesTranscript),
]);
let processedResponseScreenshot = await llmProvider.processResponse(
  screenshotResponse
);
let processedResponseTranscript = await llmProvider.processResponse(
  transcriptResponse
);
processedResponseScreenshot = await JSON.parse(
  processedResponseScreenshot.content
);
processedResponseTranscript = await JSON.parse(
  processedResponseTranscript.content
);
