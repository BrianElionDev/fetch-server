import { TranscriptResponse } from '../../types/types';
import { fetchTranscript } from '../transcript/transcript';
const fea = async () => {
  const transcript: TranscriptResponse = await fetchTranscript(
    'https://www.youtube.com/watch?v=Lr9jXJE363w',
  );
  console.log('The transcript is: ' + JSON.stringify(transcript.content));
};
fea();
