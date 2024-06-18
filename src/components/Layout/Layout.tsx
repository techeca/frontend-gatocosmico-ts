import { ReactNode, useState } from "react";
import Navigation from "./Navigation";
import { Toaster } from "../ui/sonner";
import useLoading from "@/hooks/useLoading";

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const [isLoading, setIsLoading] = useState(false);
    useLoading(isLoading, setIsLoading);

    return(
        isLoading &&
        <div className="flex flex-col h-screen">
            <Navigation />
            <main className="flex-grow flex items-center justify-center">
                {children}
            </main>
            <Toaster />
        </div>
    )
}