const API_BASE_URL = 'https://podcast-api.netlify.app';

export const fetchGenre = async (genreId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/genre/${genreId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching genre:', error);
    throw error;
  }
};

export const fetchShowList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching show list:', error);
    throw error;
  }
};

export const fetchShow = async (showId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows/${showId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching show:', error);
    throw error;
  }
};

export const fetchEpisode = async (episodeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/episodes/${episodeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching episode:', error);
    throw error;
  }
};

export const fetchAudioPlayer = async (audioSrc) => {
  try {
    const response = await fetch(`${API_BASE_URL}/audio/${audioSrc}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching AudioPlayer:', error);
    throw error;
  }
};