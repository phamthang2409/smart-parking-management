"use client";
import Link from "next/link";

export default function WorksPage() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Dashboard - Công việc</h1>
        <p>Danh sách công việc cần thực hiện tại bãi xe.</p>
        <Link href="/dashboard">
          <a className="text-blue-500 underline">Quay lại Dashboard</a>
        </Link>
      </div>
    );
}
