import DataTable from 'react-data-table-component';
import { useQuery } from "@tanstack/react-query";
import { deleteTask, fetchTasks } from '../api/tasksApi';
import { useNavigate } from "react-router-dom";
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react";
import { usePostData } from '../hooks/usePostData';
import toast from "react-hot-toast";

export default function ViewTasks() {

    const navigate = useNavigate();

    const fetchTasksData = useQuery({
        queryKey: ["fetchTasks"],
        queryFn: () => fetchTasks(),
    });

    const deleteTaskData = usePostData(deleteTask, ["deleteTask"]);

    const handleEditTask = (taskId) => {
        navigate(`/edit/${taskId}`);
    };

    const handleDeleteTask = (taskId) => {
        
        console.log("Deleting task with id:", taskId);
        deleteTaskData.mutateAsync(taskId, {
            onSuccess: (message) => {
                toast.success("Deleted task successfully!");
            },
            onError: (error) => {
                toast.error("Error updating data: " + error.message);
            },
            // onSettled: () => {
            //     setSubmitting(false);
            // },
        });
        
    };

    const truncateDescription = (description, maxLength = 100) => {
        if (description.length > maxLength) {
            return description.slice(0, maxLength) + '...';
        }
        return description;
    };

    const columns = [
        {
            name: 'Title',
            selector: row => row.Title,
        },
        {
            name: 'Description',
            selector: row => row.Description,
            cell: row => (
                
                <span>{truncateDescription(row.Description, 150)}</span>
                
            )
        },
        {
            name: 'Status',
            selector: row => row.Status,
            cell: row => (
                row.Status === "pending" ? (
                    <p className="bg-red-200 w-25 text-center font-semibold text-red-700 rounded-3xl px-4 py-2">
                        Pending
                    </p>
                ) : (
                    <p className="bg-green-200 w-25 text-center font-semibold text-green-700 rounded-3xl px-4 py-2">
                        Completed
                    </p>
                )
            
               
                
            )

        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex items-center gap-4">
                    {/* Edit Button */}
                    <button 
                        className="text-blue-500"
                        onClick={() => handleEditTask(row.TaskID)}
                    >
                        <IconPencil className="h-5 w-5" />
                    </button>
                    {/* Delete Button */}
                    <button 
                        className="text-red-500" 
                        onClick={() => handleDeleteTask(row.TaskID)}
                    >
                        <IconTrash className="h-5 w-5" />
                    </button>
                </div>
            ),
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
