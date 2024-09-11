import { Formik, Form } from "formik";
import Input from "../form/Input";
import { useEffect, useRef, useState } from "react";
import SubmitButton from "../form/SubmitButton";
import TextArea from "../form/TextArea";
import { addTask } from "../api/tasksApi";
import { usePostData } from "../hooks/usePostData";
import toast from "react-hot-toast";
import { addTaskSchema } from "../schema/addTaskSchema";

export default function AddTask() {

    const formikRef = useRef();
    const [formikState, setFormikState] = useState({});
    const [initialValues, setInitialValues] = useState({
        title: "",
        description: ""
    });

    const addTasks = usePostData(addTask, ["addTask"]);

    const onSubmit = async (values, { setSubmitting }) => {
        console.log("Form data", values);
        addTasks.mutateAsync(values, {
            onSuccess: (message) => {
                toast.success("Added task successfully!");
            },
            onError: (error) => {
                toast.error("Error updating data: " + error.message);
            },
            onSettled: () => {
                setSubmitting(false);
            },
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Task</h1>
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

                        <SubmitButton
                            formik={formik}
                            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Add Task
                        </SubmitButton>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
