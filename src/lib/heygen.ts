import axios from 'axios';

// Get API key from environment variables
const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY || '';

// Create axios instance with default config
const heygenClient = axios.create({
  baseURL: 'https://api.heygen.com/v2',
  headers: {
    'accept': 'application/json',
    'content-type': 'application/json',
    'x-api-key': HEYGEN_API_KEY
  }
});

/**
 * Generate a video using HeyGen API
 * @param options Video generation options
 * @returns Promise with video generation response
 */
export async function generateVideo(options: {
  caption?: boolean;
  dimension?: {
    width: number;
    height: number;
  };
  // Add other HeyGen API parameters as needed
}) {
  try {
    // Validate API key
    if (!HEYGEN_API_KEY) {
      throw new Error('HEYGEN_API_KEY is not configured in environment variables');
    }

    // Prepare payload
    const payload = {
      caption: options.caption ?? false,
      dimension: options.dimension || {
        width: 1280,
        height: 720
      }
    };

    // Make API request
    const response = await heygenClient.post('/video/generate', payload);
    return response.data;
  } catch (error) {
    console.error('Error generating video with HeyGen API:', error);
    throw error;
  }
}

/**
 * Get video generation status
 * @param videoId The ID of the video to check status for
 * @returns Promise with video status
 */
export async function getVideoStatus(videoId: string) {
  try {
    if (!HEYGEN_API_KEY) {
      throw new Error('HEYGEN_API_KEY is not configured in environment variables');
    }

    const response = await heygenClient.get(`/video/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching video status from HeyGen API:', error);
    throw error;
  }
}

export default {
  generateVideo,
  getVideoStatus
};