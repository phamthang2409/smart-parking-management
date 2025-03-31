"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircleParking, Smartphone, QrCode, Calendar, MapPin, Bell, DownloadCloud, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function MobileAppPage() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Giả lập gửi form
    setSubmitted(true);
    toast.success("Yêu cầu của bạn đã được gửi thành công!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <CircleParking className="h-6 w-6 text-primary" />
            <span className="text-xl">Smart Parking</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">Trang chủ</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Đăng nhập</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Quản lý bãi xe thông minh
              <span className="text-primary"> trong tầm tay</span>
            </h1>
            <p className="text-lg text-gray-600">
              Ứng dụng di động Smart Parking giúp bạn kiểm soát việc gửi xe, thanh toán và đặt chỗ trước mọi lúc, mọi nơi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full">
                <DownloadCloud className="mr-2 h-5 w-5" />
                Tải ứng dụng
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative h-[500px] w-[250px] overflow-hidden rounded-3xl border-8 border-gray-800 bg-white shadow-xl">
              <div className="absolute left-1/2 top-0 h-6 w-20 -translate-x-1/2 rounded-b-lg bg-gray-800"></div>
              <div className="h-full w-full bg-gradient-to-b from-blue-500 to-blue-600 p-4 text-white">
                <div className="mt-8 flex justify-center">
                  <CircleParking className="h-12 w-12" />
                </div>
                <h3 className="mt-2 text-center text-xl font-bold">Smart Parking</h3>
                <div className="mt-12 space-y-6">
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <QrCode className="h-8 w-8" />
                      <div>
                        <p className="font-medium">Quét mã QR</p>
                        <p className="text-sm opacity-80">Vào/ra nhanh chóng</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-8 w-8" />
                      <div>
                        <p className="font-medium">Đặt chỗ trước</p>
                        <p className="text-sm opacity-80">Không lo hết chỗ</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/10 p-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-8 w-8" />
                      <div>
                        <p className="font-medium">Tìm bãi đỗ</p>
                        <p className="text-sm opacity-80">Gần vị trí của bạn</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Tính năng nổi bật</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <QrCode className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Quét mã QR</h3>
                <p className="text-muted-foreground">
                  Vào/ra bãi đỗ xe nhanh chóng thông qua quét mã QR, không cần thẻ từ.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Bell className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Thông báo thông minh</h3>
                <p className="text-muted-foreground">
                  Nhận thông báo khi xe vào/ra, sắp hết thời gian, hoặc có ưu đãi.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Đăng ký gói tháng</h3>
                <p className="text-muted-foreground">
                  Đăng ký và gia hạn gói gửi xe tháng, quý, năm trực tiếp trên ứng dụng.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-center text-3xl font-bold">Bảng giá dịch vụ</h2>
          <p className="mb-12 text-center text-gray-600">
            Chọn gói dịch vụ phù hợp với nhu cầu của bạn
          </p>

          <Tabs defaultValue="standard" className="mx-auto max-w-3xl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="standard">Gửi xe thường</TabsTrigger>
              <TabsTrigger value="monthly">Gói theo tháng</TabsTrigger>
            </TabsList>
            <TabsContent value="standard" className="mt-6">
              <div className="rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold">Giá gửi xe theo giờ</h3>
                  <ul className="mt-4 space-y-3">
                    <li className="flex justify-between border-b pb-2">
                      <span>Xe máy</span>
                      <span className="font-medium">5.000đ/giờ</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span>Ô tô dưới 7 chỗ</span>
                      <span className="font-medium">20.000đ/giờ</span>
                    </li>
                    <li className="flex justify-between border-b pb-2">
                      <span>Ô tô từ 7 chỗ trở lên</span>
                      <span className="font-medium">25.000đ/giờ</span>
                    </li>
                    <li className="flex justify-between pb-2">
                      <span>Xe tải</span>
                      <span className="font-medium">30.000đ/giờ</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    * Giá đã bao gồm VAT. Phí qua đêm có thể thay đổi.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="monthly" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-primary">
                  <CardContent className="p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-2 text-center text-sm font-medium text-primary">
                      THÁNG
                    </div>
                    <div className="mb-4 text-center text-3xl font-bold">
                      500.000<span className="text-base font-normal text-muted-foreground">đ</span>
                    </div>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Không giới hạn vào/ra</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Vị trí cố định</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Bảo vệ 24/7</span>
                      </li>
                    </ul>
                    <Button className="w-full">Đăng ký ngay</Button>
                  </CardContent>
                </Card>
                <Card className="border-primary">
                  <CardContent className="p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-2 text-center text-sm font-medium text-primary">
                      QUÝ
                    </div>
                    <div className="mb-4 text-center text-3xl font-bold">
                      1.350.000<span className="text-base font-normal text-muted-foreground">đ</span>
                    </div>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Không giới hạn vào/ra</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Vị trí cố định</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Bảo vệ 24/7</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Tiết kiệm 10%</span>
                      </li>
                    </ul>
                    <Button className="w-full">Đăng ký ngay</Button>
                  </CardContent>
                </Card>
                <Card className="border-primary">
                  <CardContent className="p-6">
                    <div className="mb-4 rounded-full bg-primary/10 p-2 text-center text-sm font-medium text-primary">
                      NĂM
                    </div>
                    <div className="mb-4 text-center text-3xl font-bold">
                      4.800.000<span className="text-base font-normal text-muted-foreground">đ</span>
                    </div>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Không giới hạn vào/ra</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Vị trí cố định</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Bảo vệ 24/7</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Tiết kiệm 20%</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Hỗ trợ ưu tiên</span>
                      </li>
                    </ul>
                    <Button className="w-full">Đăng ký ngay</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Download CTA */}
      <section className="bg-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Tải ứng dụng ngay hôm nay</h2>
            <p className="mb-8 text-lg">
              Trải nghiệm ngay dịch vụ đỗ xe thông minh hàng đầu Việt Nam. Đăng ký để nhận thông báo khi ứng dụng ra mắt:
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg flex-col gap-4 sm:flex-row">
                <Input
                  type="email"
                  placeholder="Email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-white bg-white/20 text-white placeholder:text-white/70"
                  required
                />
                <Button type="submit" variant="secondary" size="lg">
                  Đăng ký
                </Button>
              </form>
            ) : (
              <div className="mx-auto flex max-w-lg items-center justify-center rounded-lg bg-white/10 p-4">
                <CheckCircle className="mr-2 h-5 w-5" />
                <span>Cảm ơn bạn đã đăng ký! Chúng tôi sẽ thông báo khi ứng dụng ra mắt.</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2 text-white">
                <CircleParking className="h-6 w-6" />
                <span className="text-xl font-semibold">Smart Parking</span>
              </div>
              <p className="mb-6">
                Hệ thống quản lý bãi đỗ xe thông minh hàng đầu Việt Nam
              </p>
              <div className="flex gap-4">
                <Button size="icon" variant="ghost">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </Button>
                <Button size="icon" variant="ghost">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </Button>
                <Button size="icon" variant="ghost">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </Button>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Liên kết</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Trang chủ</a></li>
                <li><a href="#" className="hover:text-white">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-white">Bảng giá</a></li>
                <li><a href="#" className="hover:text-white">Bản đồ bãi đỗ</a></li>
                <li><a href="#" className="hover:text-white">Liên hệ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Hỗ trợ</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Trung tâm hỗ trợ</a></li>
                <li><a href="#" className="hover:text-white">Câu hỏi thường gặp</a></li>
                <li><a href="#" className="hover:text-white">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:text-white">Chính sách bảo mật</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-white">Liên hệ</h3>
              <address className="not-italic">
                <p className="mb-2">123 Đường Nguyễn Văn Linh</p>
                <p className="mb-2">Quận 7, TP. Hồ Chí Minh</p>
                <p className="mb-2">contact@smartparking.vn</p>
                <p>+84 28 1234 5678</p>
              </address>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-6 text-center">
            <p>© 2024 Smart Parking. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
