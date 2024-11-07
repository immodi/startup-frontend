import { PageProps } from "@/interfaces/auth/pageProp";

export interface UserProp {
    name: string;
    email: string;
    joinDate: Date;
    recentActivities: string[];
}

export interface ComponentsProps extends PageProps {
    user: UserProp;
}
