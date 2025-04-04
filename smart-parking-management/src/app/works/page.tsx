"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import CameraCapture from "@/components/CameraCapture";
import PlateRecognition from "@/components/PlateRecognition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Component TaskCard để hiển thị công việc
const TaskCard = ({
  title,
  description,
  isCompleted,
}: {
  title: string;
  description: string;
  isCompleted: boolean;
}) => (
  <Card className={isCompleted ? "bg-green-50" : "bg-yellow-50"}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{isCompleted ? "Công việc đã hoàn thành." : "Công việc đang thực hiện."}</p>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const [tasks, setTasks] = useState([
    { title: "Công việc 1", description: "Mô tả công việc 1", isCompleted: false },
    { title: "Công việc 2", description: "Mô tả công việc 2", isCompleted: true },
    { title: "Công việc 3", description: "Mô tả công việc 3", isCompleted: false },
  ]);

  const [image, setImage] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Hiển thị các task */}
        {tasks.map((task, index) => (
          <TaskCard
            key={index}
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
          />
        ))}

        {/* Thêm card chứa camera + nhận diện biển số */}
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle>Quét biển số xe</CardTitle>
            <CardDescription>Chụp và nhận diện biển số bằng camera máy tính</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CameraCapture onCapture={setImage} />
            {image && <PlateRecognition image={image} />}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
