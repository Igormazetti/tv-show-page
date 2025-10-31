import Promise from 'bluebird';

const API_BASE_URL = 'https://agile-releases.s3.us-east-1.amazonaws.com/tests';
const SHOW_ID = 'SHOW123';

export class TVShowService {
  static async fetchShowData() {
    try {
      const response = await fetch(`${API_BASE_URL}/tv-shows/${SHOW_ID}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching show data:', error);
      throw error;
    }
  }

  static async fetchEpisodesData() {
    try {
      const response = await fetch(`${API_BASE_URL}/episodes/${SHOW_ID}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      return data.filter(episode => episode !== null);
    } catch (error) {
      console.error('Error fetching episodes data:', error);
      throw error;
    }
  }

  static async fetchAllData() {
    try {
      const results = await Promise.props({
        show: this.fetchShowData(),
        episodes: this.fetchEpisodesData()
      });
      
      return results;
    } catch (error) {
      console.error('Error fetching all data:', error);
      throw error;
    }
  }
}
