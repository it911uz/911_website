import { getTask } from "@/api/tasks/get-task.api";
import { auth } from "@/auth";
import { EditTask } from "./edit-task";
import { DeleteTask } from "./delete-task";
import { TaskComments } from "./task-comments";
import { getTaskComments } from "@/api/tasks/get-task-comments.api";
import { getTaskFiles } from "@/api/tasks/get-task-files.api";

export const TaskContent = async ({ taskId }: Props) => {
    const session = await auth();

    const [taskData, commentData, filesData] = await Promise.all([getTask({
        token: session?.user.accessToken,
        id: taskId,
    }), getTaskComments({
        token: session?.user.accessToken,
        id: taskId
    }), getTaskFiles({
        token: session?.user.accessToken,
        taskId
    })]);

    return (
        <section className="px-4 py-12 lg:px-6 space-y-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row">
                <div className="max-w-2xl space-y-4">
                    <h1 className="text-4xl font-bold">{taskData.data.name}</h1>

                    <div
                        className="text-gray-600 leading-relaxed prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: taskData.data.description ?? "" }}
                    />

                    <div className="flex flex-wrap gap-2 mt-2">
                        {taskData.data.tags.map((tag) => (
                            <span
                                key={tag.id}
                                className="px-3 py-1 rounded-full bg-gray-100 border text-gray-700 text-sm"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>

                    <p className="font-semibold">Ответственные:</p>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {taskData.data.users.map((user) => (
                            <span
                                key={user.id}
                                className="px-3 py-1 rounded-full bg-gray-04 border text-gray-700 text-sm"
                            >
                                {user.full_name}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <EditTask task={taskData.data} />
                    <DeleteTask taskId={taskData.data.id} />
                </div>
            </div>

            <TaskComments comments={commentData.data} files={filesData.data} />
        </section>
    );
};

interface Props {
    taskId: number;
}
