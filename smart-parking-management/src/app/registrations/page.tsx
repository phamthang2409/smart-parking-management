"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegistrationForm } from "@/components/registrations/RegistrationForm";
import { RegistrationsList } from "@/components/registrations/RegistrationsList";
import { registrationCar } from "../../app/hooks/useRegistrationCar";
export default function RegistrationsPage() {
  const [currentTab, setCurrentTab] = useState("new");
  const [registeredCars, setRegisteredCars] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await registrationCar();
      const formattedData = data.map((item: any) => ({
        Id: item.id,
        CustomerName: item.customerName,
        LicensedPlate: item.licensedPlate,
        CarName: item.carName,
        PackageName: item.packageName,
        StartDate: item.startDate,
        EndDate: item.endDate,
        State: item.state,
      }));
      setRegisteredCars(formattedData);
    }
    if (currentTab == "list") fetchData(); // Gọi trong useEffect
  }, [currentTab]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Đăng ký xe tháng</h1>
          <p className="text-muted-foreground">
            Quản lý đăng ký xe tháng và xem danh sách xe đã đăng ký
          </p>
        </div>

        <Tabs
          defaultValue="new"
          value={currentTab}
          onValueChange={setCurrentTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="new">Đăng ký mới</TabsTrigger>
            <TabsTrigger value="list">Danh sách đã đăng ký</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Đăng ký xe tháng</CardTitle>
                <CardDescription>
                  Đăng ký gửi xe theo gói tháng, quý hoặc năm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegistrationForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách xe đăng ký</CardTitle>
                <CardDescription>
                  Quản lý danh sách xe đã đăng ký gửi theo tháng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegistrationsList data={registeredCars} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
