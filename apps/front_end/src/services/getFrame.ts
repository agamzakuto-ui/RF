import axios from 'axios';

export const getFrame = async () => {
    try{
        const response = await axios.get('/api/getFrame')
        return response.data;
    }
    catch(error){
        console.error('Error get frame:', error);
        throw error;
    }
}