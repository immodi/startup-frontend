import { PageProps } from "@/interfaces/pageProp";

export interface UserProp {
    name: string;
    email: string;
    joinDate: Date;
    recentActivities: string[];
}

export interface ComponentsProps extends PageProps {
    user: UserProp;
}
