import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export async function AuthGuard({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session?.user) redirect("/api/auth/signin");
    return <>{children}</>;
}