import apiClient from './apiClient';

export const fetchTasks = async () => {
    const res = await apiClient.get('/tasks/view');
    return res.data;
}