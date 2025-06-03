import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminUserTable from "./_components/AdminUserTable";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="py-16 px-6 mx-auto w-full max-w-6xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">회원 관리</h1>
      <AdminUserTable />
    </div>
  );
}
