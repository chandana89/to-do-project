import DataTable from 'react-data-table-component';
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from '../api/tasksApi';
import { useNavigate } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";

export default function ViewTasks() {

    const navigate = useNavigate();

    const fetchTasksData = useQuery({
        queryKey: ["fetchTasks"],
        queryFn: () => fetchTasks(),
    });

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

    const handleAddTask = () => {
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
                
                <div className="flex justify-end mb-5">
                    <div
                        className="flex items-center bg-red-800 px-4 py-2 rounded-lg cursor-pointer"
                        onClick={handleAddTask}
                    >
                        <IconPlus className="text-white h-6" />
                        <button className="text-white ml-2 font-semibold">Add New Task</button>
                    </div>
                </div>

                {/* Table should take full width */}
                <div className="bg-white shadow-lg rounded-lg w-full">
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
