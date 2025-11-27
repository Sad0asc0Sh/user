"use client";

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">داشبورد مدیریت</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">سفارشات امروز</h3>
                    <p className="text-3xl font-black text-gray-800">12</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">درآمد امروز</h3>
                    <p className="text-3xl font-black text-gray-800">2,500,000 <span className="text-sm font-normal text-gray-400">تومان</span></p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium mb-2">کاربران جدید</h3>
                    <p className="text-3xl font-black text-gray-800">5</p>
                </div>
            </div>
        </div>
    );
}
