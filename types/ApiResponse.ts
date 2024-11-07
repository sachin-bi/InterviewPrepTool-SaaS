import { Interaction } from "@/model/User";


export interface ApiResponse{
    success: boolean;
    message: string;
    isSubscribed?: boolean;
    interaction?:Array<Interaction>
}