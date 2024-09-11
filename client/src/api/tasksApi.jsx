import apiClient from './apiClient';

export const fetchTasks = async () => {
    const res = await apiClient.get('/tasks/view');
    return res.data;
}

export const addTask = async (data) => {
    const res = await apiClient.post('/tasks/add',data);
    return res;
}

export const deleteTask = async (taskId) => {
    const res = await apiClient.delete('/tasks/delete/'+taskId);
    return res;
}