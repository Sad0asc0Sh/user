"use client";
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Save, Bot, MessageSquare, Zap, AlertCircle } from "lucide-react";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await api.get("/settings");
            setSettings(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            await api.put("/settings", settings);
            alert("تنظیمات با موفقیت ذخیره شد");
        } catch (err) {
            console.error(err);
            alert("خطا در ذخیره تنظیمات");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-4 border-vita-600 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <AlertCircle size={48} className="mb-4 text-red-500" />
                <p>خطا در دریافت تنظیمات</p>
                <button onClick={fetchSettings} className="mt-4 text-vita-600 hover:underline">تلاش مجدد</button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-black text-gray-800">تنظیمات سایت</h1>
            </div>

            {/* AI Settings Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">تنظیمات هوش مصنوعی</h2>
                        <p className="text-sm text-gray-500">مدیریت دستیار هوشمند و محدودیت‌ها</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Enabled Toggle */}
                    <div className="col-span-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${settings.aiConfig?.enabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <span className="font-bold text-gray-700">فعال‌سازی دستیار هوشمند</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.aiConfig?.enabled || false}
                                onChange={(e) => setSettings({ ...settings, aiConfig: { ...settings.aiConfig, enabled: e.target.checked } })}
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-100 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:right-[unset] rtl:after:right-[2px] rtl:after:left-[unset] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                    </div>

                    {/* User Daily Limit */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <MessageSquare size={18} className="text-gray-400" />
                            محدودیت پیام روزانه کاربر
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                value={settings.aiConfig?.userDailyLimit || 20}
                                onChange={(e) => setSettings({ ...settings, aiConfig: { ...settings.aiConfig, userDailyLimit: Number(e.target.value) } })}
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold">پیام</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed flex items-start gap-1">
                            <AlertCircle size={12} className="mt-0.5 shrink-0" />
                            تعداد پیام‌هایی که هر کاربر می‌تواند در طول ۲۴ ساعت به هوش مصنوعی ارسال کند. پس از رسیدن به این حد، کاربر باید تا روز بعد صبر کند.
                        </p>
                    </div>

                    {/* Max Tokens */}
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                            <Zap size={18} className="text-gray-400" />
                            حداکثر توکن پاسخ
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                                value={settings.aiConfig?.maxTokens || 500}
                                onChange={(e) => setSettings({ ...settings, aiConfig: { ...settings.aiConfig, maxTokens: Number(e.target.value) } })}
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-bold">Token</span>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            حداکثر طول پاسخ هوش مصنوعی. هر 1000 توکن تقریباً معادل 750 کلمه است.
                        </p>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-vita-600 hover:bg-vita-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-vita-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                    <Save size={20} />
                    {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
                </button>
            </div>
        </div>
    );
}
