import { auth } from "@/server/auth";
import ClientLayout from "./layout";
import { redirect } from "next/navigation";

async function ServerLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session) return redirect('/');
    return <ClientLayout session={session}>{children}</ClientLayout>;
}