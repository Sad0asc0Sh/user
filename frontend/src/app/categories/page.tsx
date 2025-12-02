import CategoriesContent from "@/components/features/categories/CategoriesContent";

export const revalidate = 600;

export default function CategoriesPage() {
    return (
        <div className="flex h-[calc(100dvh-140px)] bg-white overflow-hidden">
            <CategoriesContent />
        </div>
    );
}
