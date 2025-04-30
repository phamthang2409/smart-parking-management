export async function checkInCar() {
  try {
    const res = await fetch("https://localhost:7107/api/CheckInCar");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đăng ký:", error);
    return []; // fallback
  }
}
