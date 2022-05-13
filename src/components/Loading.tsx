import { CircleNotch } from "phosphor-react";

export function Loading(){
    return(
        <div className="flex justify-center items-center animate-spin">
            <CircleNotch className="w-4 h-4"/>
        </div>
    )
}