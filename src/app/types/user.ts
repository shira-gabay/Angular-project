export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    courses: Course[];
}
export interface Course{
    id: number;
    title: string;
    description: string;
    teacherId: number;
}
export interface Lesson{
    lessonId: number;
    title: string;
    content: string;
    courseId: number;
}
