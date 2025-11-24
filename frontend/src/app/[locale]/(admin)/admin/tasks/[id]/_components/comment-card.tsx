import type { TaskComment } from "@/types/tasks.type";
import dayjs from "dayjs";
import { DeleteTaskComment } from "./delete-task-comment";

export const CommentCard = ({ comment }: Props) => {
    return (
        <article className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow transition">
            <header className="flex gap-4 mb-4 justify-between">

                <div className="space-y-1.5">
                    <h3 className="font-semibold text-lg">{comment.user.full_name}</h3>

                    <p className="text-gray-500 text-sm">
                        {comment.user.role.name}
                    </p>

                    <time className="text-gray-600 text-lg">
                        {dayjs(comment.created_at).format("DD.MM.YYYY HH:mm")}
                    </time>
                </div>

                <DeleteTaskComment comment={comment} />
            </header>

            <div
                className="prose prose-gray max-w-none text-gray-800"
                dangerouslySetInnerHTML={{ __html: comment.comment }}
            />
        </article>
    );
};

interface Props {
    comment: TaskComment
}