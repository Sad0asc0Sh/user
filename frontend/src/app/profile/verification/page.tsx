"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowRight, User, Phone, MapPin, CreditCard, Building2, Save,
    Calendar as CalendarIcon, Mail, ShieldCheck, AlertCircle
} from "lucide-react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { authService, User as UserType } from "@/services/authService";

export default function VerificationPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        nationalCode: "",
        birthDate: "",
        landline: "",
        province: "",
        city: "",
        shebaNumber: "",
        isLegal: false,
        companyName: "",
        companyNationalId: "",
        companyRegistrationId: "",
        companyLandline: "",
        companyProvince: "",
        companyCity: ""
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (!authService.isAuthenticated()) {
                    router.push("/login");
                    return;
                }
                const userData = await authService.getProfile();
                setUser(userData);

                // Initialize form
                setFormData({
                    name: userData.name || "",
                    email: userData.email || "",
                    nationalCode: userData.nationalCode || "",
                    birthDate: userData.birthDate || "",
                    landline: userData.landline || "",
                    province: userData.province || "",
                    city: userData.city || "",
                    shebaNumber: userData.shebaNumber || "",
                    isLegal: userData.isLegal || false,
                    companyName: userData.companyName || "",
                    companyNationalId: userData.companyNationalId || "",
                    companyRegistrationId: userData.companyRegistrationId || "",
                    companyLandline: userData.companyLandline || "",
                    companyProvince: userData.companyProvince || "",
                    companyCity: userData.companyCity || ""
                });
            } catch (err: any) {
                setError(err.message || "خطا در دریافت اطلاعات");
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date: any) => {
        if (date) {
            // Convert to JS Date and then to ISO string for backend
            // date.toDate() returns a JS Date object
            setFormData(prev => ({
                ...prev,
                birthDate: date.toDate().toISOString()
            }));
        } else {
            setFormData(prev => ({ ...prev, birthDate: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError(null);
        setSuccess(null);

        // Basic Validation
        if (!formData.name) {
            setError("نام و نام خانوادگی الزامی است");
            setSaving(false);
            return;
        }
        if (formData.nationalCode && !/^\d{10}$/.test(formData.nationalCode)) {
            setError("کد ملی باید ۱۰ رقم باشد");
            setSaving(false);
            return;
        }
        if (formData.shebaNumber && !/^IR\d{24}$/.test(formData.shebaNumber)) {
            setError("شماره شبا باید با IR شروع شده و ۲۶ کاراکتر باشد");
            setSaving(false);
            return;
        }

        try {
            await authService.updateProfile(formData);
            setSuccess("اطلاعات با موفقیت ذخیره شد");
            // Refresh user data
            const updatedUser = await authService.getProfile();
            setUser(updatedUser);
            window.scrollTo(0, 0);
        } catch (err: any) {
            setError(err.message || "خطا در ذخیره اطلاعات");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">در حال بارگذاری...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white p-4 flex items-center gap-3 shadow-sm sticky top-0 z-10">
                <Link
                    href="/profile"
                    className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                >
                    <ArrowRight size={20} />
                </Link>
                <h1 className="font-bold text-lg text-gray-800">اطلاعات حساب کاربری</h1>
            </div>

            <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto space-y-6">

                {/* Status Messages */}
                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border border-red-100">
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 text-green-600 p-4 rounded-xl flex items-center gap-3 text-sm font-medium border border-green-100">
                        <ShieldCheck size={20} />
                        {success}
                    </div>
                )}

                {/* Legal Person Switch */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Building2 size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800 text-sm">شخص حقوقی</p>
                            <p className="text-xs text-gray-400">ثبت اطلاعات شرکت یا سازمان</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="isLegal"
                            checked={formData.isLegal}
                            onChange={handleChange}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>

                {/* Personal Info */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                        <User size={18} className="text-vita-500" />
                        اطلاعات شخصی
                    </h2>

                    <div className="space-y-3">
                        <Input
                            label="نام و نام خانوادگی"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="مثال: علی محمدی"
                        />
                        <Input
                            label="کد ملی"
                            name="nationalCode"
                            value={formData.nationalCode}
                            onChange={handleChange}
                            placeholder="۱۰ رقم بدون خط تیره"
                            maxLength={10}
                            type="tel"
                        />

                        {/* Solar Date Picker */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 pr-1">تاریخ تولد</label>
                            <div className="w-full">
                                <DatePicker
                                    value={formData.birthDate ? new Date(formData.birthDate) : ""}
                                    onChange={handleDateChange}
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    inputClass="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-vita-500 focus:ring-1 focus:ring-vita-500 outline-none transition-all"
                                    placeholder="انتخاب تاریخ تولد"
                                />
                            </div>
                        </div>

                        <Input
                            label="ایمیل"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@domain.com"
                            dir="ltr"
                        />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                        <Phone size={18} className="text-vita-500" />
                        اطلاعات تماس
                    </h2>

                    <div className="space-y-3">
                        <Input
                            label="تلفن ثابت"
                            name="landline"
                            value={formData.landline}
                            onChange={handleChange}
                            placeholder="به همراه کد شهر"
                            type="tel"
                        />
                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                label="استان"
                                name="province"
                                value={formData.province}
                                onChange={handleChange}
                            />
                            <Input
                                label="شهر"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Financial Info */}
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2 text-sm">
                        <CreditCard size={18} className="text-vita-500" />
                        اطلاعات مالی
                    </h2>

                    <Input
                        label="شماره شبا"
                        name="shebaNumber"
                        value={formData.shebaNumber}
                        onChange={handleChange}
                        placeholder="IR000000000000000000000000"
                        dir="ltr"
                        className="font-mono text-center tracking-widest"
                    />
                    <p className="text-[10px] text-gray-400 pr-1">جهت بازگشت وجه در صورت لغو سفارش</p>
                </div>

                {/* Legal Info Section */}
                {formData.isLegal && (
                    <div className="bg-blue-50 p-5 rounded-2xl shadow-sm border border-blue-100 space-y-4">
                        <h2 className="font-bold text-blue-800 flex items-center gap-2 text-sm">
                            <Building2 size={18} />
                            اطلاعات حقوقی
                        </h2>

                        <div className="space-y-3">
                            <Input
                                label="نام شرکت / سازمان"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                            <Input
                                label="شناسه ملی"
                                name="companyNationalId"
                                value={formData.companyNationalId}
                                onChange={handleChange}
                                maxLength={11}
                            />
                            <Input
                                label="شماره ثبت"
                                name="companyRegistrationId"
                                value={formData.companyRegistrationId}
                                onChange={handleChange}
                            />
                            <Input
                                label="تلفن ثابت شرکت"
                                name="companyLandline"
                                value={formData.companyLandline}
                                onChange={handleChange}
                            />
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="استان دفتر مرکزی"
                                    name="companyProvince"
                                    value={formData.companyProvince}
                                    onChange={handleChange}
                                />
                                <Input
                                    label="شهر دفتر مرکزی"
                                    name="companyCity"
                                    value={formData.companyCity}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-vita-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-vita-200 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    {saving ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <Save size={20} />
                            ثبت و ذخیره اطلاعات
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

function Input({ label, className, ...props }: any) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 pr-1">{label}</label>
            <input
                className={`w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:border-vita-500 focus:ring-1 focus:ring-vita-500 outline-none transition-all ${className}`}
                {...props}
            />
        </div>
    );
}
