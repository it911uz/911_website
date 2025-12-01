"use client";

import type { TaskComment as TaskCommentType, TaskFile } from "@/types/tasks.type";
import { CommentCard } from "./comment-card";
import { TaskComment } from "./task-comment";
import { FileText, FolderDown } from "lucide-react";
import { DeleteTaskFile } from "./delete-task-file";
import { useParams } from "next/navigation";

export const TaskComments = ({ comments = [], files = [] }: Props) => {
    const { id } = useParams<{ id: string }>();
    return (
        <>
            {files.length ? (
                <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileText className="text-blue-600" size={20} />
                        <span>Прикреплённые файлы</span>
                    </h3>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {files.map((item) => (
                            <li
                                key={item.id}
                                className="flex justify-between items-center p-4 rounded-xl bg-white/70 border border-gray-200 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-blue-600">
                                        <FolderDown size={24} />
                                    </div>
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-gray-700 hover:text-blue-600 break-all"
                                    >
                                        {item.filename}
                                    </a>
                                </div>

                                <div className="text-gray-400 hover:text-red-500 transition-colors">
                                    <DeleteTaskFile id={item.id} taskId={Number(id)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}

            {comments.length ? comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
            )) : (
                <p className="text-gray-500 italic">Комментариев пока нет…</p>
            )}

            <TaskComment />
        </>
    );
};

interface Props {
    comments: TaskCommentType[];
    files: TaskFile[];
}


interface CommentItem {
    id: number;
    user: {
        name: string;
        avatar?: string;
    };
    created_at: string;
    message: string;
    files?: { name: string; url: string }[];
}