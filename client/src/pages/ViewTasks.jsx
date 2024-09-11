import DataTable from 'react-data-table-component';
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from '../api/tasksApi';
import { useNavigate } from "react-router-dom";
import { IconPencil } from "@tabler/icons-react";

export default function ViewTasks() {

    const navigate = useNavigate();

    const fetchTasksData = useQuery({
        queryKey: ["fetchTasks"],
        queryFn: () => fetchTasks(),
    });

    console.log(fetchTasksData.data)

    const columns = [
        {
            name: 'Title',
            selector: row => row.Title,
        },
        {
            name: 'Description',
            selector: row => row.Description,
        },
        {
            name: 'Status',
            selector: row => row.Status,
        },
    ];

    const handleEditPlacement = () => {
        navigate("/add");
    };

    if (fetchTasksData?.isLoading) {
        return <div>Loading...</div>;
    }
    
    if (fetchTasksData?.isError) {
    return <div>There is an error!</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-4">
                <div className="bg-white shadow-lg rounded-lg h-full w-full">
                <div className="flex gap-2 flex-row justify-between items-center bg-red-800 mb-5 cursor-pointer px-4 py-2 rounded-lg w-40n self-end"
                                    onClick={handleEditPlacement}>
                                    <IconPencil className="text-white h-6 font-semibold" />
                                    <button
                                        className="text-white">Edit</button>
                                </div>
                    <DataTable
                        title="TO DO List"
                        columns={columns}
                        data={fetchTasksData.data}
                        pagination
                    />
                </div>
            </div>
        </div>
    );

}