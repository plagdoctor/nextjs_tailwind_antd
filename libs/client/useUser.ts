
import { useRouter } from "next/router";
import { useEffect, useState} from "react";
import useSWR from "swr";

interface Profile{
    empno:String;
    empname:String;
}

interface ProfileResponse {
    ok:boolean;
    profile: Profile;
}

export default function useUser() {
    const {data, error} = useSWR<ProfileResponse>("/api/users/me");
    const router = useRouter();
    useEffect(() => {
        if(data && !data.ok){
            router.replace("/login");
        }
    }, [data, router]);
    return { user: data?.profile , isLoading: !data && !error};
}