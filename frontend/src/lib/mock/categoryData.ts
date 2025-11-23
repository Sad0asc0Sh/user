import { Cctv, ShieldAlert, Smartphone, Router, Battery } from "lucide-react";

export const CATEGORIES = [
    {
        id: "cctv",
        name: "دوربین مداربسته",
        icon: Cctv,
        groups: [
            {
                id: "cctv-types",
                name: "انواع دوربین",
                items: [
                    { id: 1, name: "پکیج‌های اقتصادی", image: "/images/cat-cctv-pack.jpg" },
                    { id: 2, name: "دوربین دام (Dome)", image: "/images/cat-dome.jpg" },
                    { id: 3, name: "دوربین بالت (Bullet)", image: "/images/cat-bullet.jpg" },
                ]
            },
            {
                id: "cctv-recorders",
                name: "دستگاه‌های ضبط",
                items: [
                    { id: 4, name: "دستگاه DVR", image: "/images/cat-dvr.jpg" },
                    { id: 5, name: "دستگاه NVR", image: "/images/cat-nvr.jpg" },
                ]
            }
        ]
    },
    {
        id: "alarm",
        name: "دزدگیر اماکن",
        icon: ShieldAlert,
        groups: [
            {
                id: "alarm-main",
                name: "سیستم اصلی",
                items: [
                    { id: 6, name: "پنل مرکزی دزدگیر", image: "/images/cat-panel.jpg" },
                    { id: 7, name: "تلفن‌کننده خط شهری", image: "/images/cat-dialer.jpg" },
                ]
            },
            {
                id: "alarm-sensors",
                name: "سنسورها و لوازم",
                items: [
                    { id: 8, name: "چشمی و سنسور", image: "/images/cat-sensor.jpg" },
                    { id: 9, name: "آژیر و بلندگو", image: "/images/cat-siren.jpg" },
                    { id: 10, name: "ریموت کنترل", image: "/images/cat-remote.jpg" },
                ]
            }
        ]
    },
    {
        id: "smarthome",
        name: "خانه هوشمند",
        icon: Smartphone,
        groups: [
            {
                id: "smart-control",
                name: "کنترل و روشنایی",
                items: [
                    { id: 11, name: "کلید و پریز هوشمند", image: "/images/cat-switch.jpg" },
                    { id: 12, name: "رله و کنترلر", image: "/images/cat-relay.jpg" },
                ]
            },
            {
                id: "smart-security",
                name: "امنیت هوشمند",
                items: [
                    { id: 13, name: "دستگیره دیجیتال", image: "/images/cat-lock.jpg" },
                    { id: 14, name: "سنسور هوشمند", image: "/images/cat-smart-sensor.jpg" },
                ]
            }
        ]
    },
    {
        id: "network",
        name: "تجهیزات شبکه",
        icon: Router,
        groups: [
            {
                id: "net-active",
                name: "تجهیزات اکتیو",
                items: [
                    { id: 15, name: "مودم و روتر", image: "/images/cat-modem.jpg" },
                    { id: 16, name: "سوییچ شبکه", image: "/images/cat-switch-net.jpg" },
                ]
            },
            {
                id: "net-passive",
                name: "تجهیزات پسیو",
                items: [
                    { id: 17, name: "کابل و پچ‌کورد", image: "/images/cat-cable.jpg" },
                    { id: 18, name: "رک و متعلقات", image: "/images/cat-rack.jpg" },
                ]
            }
        ]
    },
    {
        id: "power",
        name: "برق و انرژی",
        icon: Battery,
        groups: [
            {
                id: "power-ups",
                name: "برق اضطراری",
                items: [
                    { id: 19, name: "یوپی‌اس (UPS)", image: "/images/cat-ups.jpg" },
                    { id: 20, name: "استابلایزر", image: "/images/cat-stabilizer.jpg" },
                ]
            },
            {
                id: "power-supply",
                name: "منبع تغذیه",
                items: [
                    { id: 21, name: "باتری خشک", image: "/images/cat-battery.jpg" },
                    { id: 22, name: "آداپتور صنعتی", image: "/images/cat-adapter.jpg" },
                ]
            }
        ]
    },
];
