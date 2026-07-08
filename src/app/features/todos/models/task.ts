export type TaskPriority = 'low' | 'medium' | 'high';
export const PRIORITY_ORDER: Record<TaskPriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
};
export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: TaskPriority;
}