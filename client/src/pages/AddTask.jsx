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
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IconArrowLeft } from "@tabler/icons-react";

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
    const navigate = useNavigate();

    const taskData = useQuery({
        queryKey: ["fetchTasksById", taskId],
        queryFn: () => fetchTasksById(taskId),
        enabled: !!taskId
    });

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
        
        <div className="max-w-md mx-auto p-6 mt-6 bg-gray-100 rounded-lg shadow-lg">
            <button
                className="flex items-center text-blue-600 hover:text-blue-800 transition duration-200"
                onClick={() => navigate("/")}
                >
                    <IconArrowLeft className="h-6 w-6 mr-1" />
                    <span>Back</span>
            </button>
            
                
            <h1 className="text-2xl font-bold text-center text-gray-800 w-full">{showEdit ? 'Edit Task' : 'Add New Task'}</h1>
                
            
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
                            placeholder = "Enter title"
                            withAsterisk
                        />
                        <TextArea
                            name="description"
                            label="Description"
                            placeholder="Enter description"
                            withAsterisk
                        />
                        <Select
                            name="status"
                            label="Status"
                            options={[
                                { key: "Pending", value: "pending" },
                                { key: "Completed", value: "completed" }
                              ]}
                            withAsterisk
                        />
                        <SubmitButton
                            formik={formik}
                            
                        >
                            {showEdit ? 'Edit' : 'Add'}
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
