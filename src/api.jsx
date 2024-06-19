const API_BASE_URL = 'https://podcast-api.netlify.app';

export const fetchPreviews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching previews:', error);
    throw error;
  }
};

export const fetchGenre = async (genreId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/genre/${genreId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching genre:', error);
    throw error;
  }
};

export const fetchShowDetails = async (showId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/id/${showId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching show details:', error);
    throw error;
  }
};

export const fetchEpisode = async (episodeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/id/${episodeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episode:', error);
    throw error;
  }
}

export const fetchAudioPlayer = async (audiosrc) => {
    try {
        const response = await fetch(`${API_BASE_URL}/id/${audiosrc}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching AudioPlayer:', error);
        throw error;
    }
}