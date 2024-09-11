import { Formik, Form } from "formik";
import Input from "../form/Input";
import { useRef, useState, useEffect } from "react";
import SubmitButton from "../form/SubmitButton";
import TextArea from "../form/TextArea";
import { addTask, fetchTasksById } from "../api/tasksApi";
import { usePostData } from "../hooks/usePostData";
import toast from "react-hot-toast";
import { addTaskSchema } from "../schema/addTaskSchema";
import Select from "../form/Select";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function AddTask() {

    const formikRef = useRef();
    const [formikState, setFormikState] = useState({});
    const [initialValues, setInitialValues] = useState({
        title: "",
        description: "",
        status: ""
    });
    const { taskId } = useParams();
    const [showEdit, setShowEdit] = useState(false);

    // Handle task data fetching and setting initial values
    const taskData = useQuery({
        queryKey: ["fetchTasksById", taskId],
        queryFn: () => fetchTasksById(taskId),
        enabled: !!taskId // Only run this if taskId exists
    });

    // Use effect to set the initial values when task data is fetched
    useEffect(() => {
        if (taskId && taskData.data) {
            setShowEdit(true);
            setInitialValues({
                title: taskData.data[0].Title,
                description: taskData.data[0].Description,
                status: taskData.data[0].Status
            });
        }
    }, [taskId, taskData.data]);

    const addTasks = usePostData(addTask, ["addTask"]);

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log("Form data", values);
        if(showEdit){
            values.taskId = taskId;
        }
        addTasks.mutateAsync(values, {
            onSuccess: (message) => {
                if(showEdit){
                    toast.success("Edited task successfully!");
                }else{
                    toast.success("Added task successfully!");
                    resetForm();
                }
            },
            onError: (error) => {
                toast.error("Error updating data: " + error.message);
            },
            onSettled: () => {
                setSubmitting(false);
            },
        });
    };

    if (taskData.isLoading && taskId) {
        return <div>Loading...</div>;
    }

    if (taskData.isError) {
        return <div>There is an error!</div>;
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-gray rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">{showEdit ? 'Edit Task' : 'Add New Task'}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={addTaskSchema}
                onSubmit={onSubmit}
                innerRef={(formikInstance) => {
                    formikRef.current = formikInstance;
                    setFormikState(formikInstance ? formikInstance.values : {});
                }}
                enableReinitialize={true}
            >
                {formik => (
                    <Form className="space-y-6">
                        <Input
                            name="title"
                            label="Title"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <TextArea
                            name="description"
                            label="Description"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <Select
                            name="status"
                            label="Status"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            options={[
                                { key: "Pending", value: "pending" },
                                { key: "Completed", value: "completed" }
                              ]}
                        />
                        <SubmitButton
                            formik={formik}
                            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            {showEdit ? 'Edit' : 'Add'}
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
