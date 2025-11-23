"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const SheetContext = React.createContext<{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const Sheet = ({
    children,
    open: controlledOpen,
    onOpenChange
}: {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}) => {
    const [internalOpen, setInternalOpen] = React.useState(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const setOpen = React.useCallback((newOpen: boolean | ((prev: boolean) => boolean)) => {
        const nextOpen = typeof newOpen === 'function' ? newOpen(open) : newOpen;

        if (!isControlled) {
            setInternalOpen(nextOpen);
        }

        onOpenChange?.(nextOpen);
    }, [isControlled, open, onOpenChange]);

    return (
        <SheetContext.Provider value={{ open, setOpen }}>
            {children}
        </SheetContext.Provider>
    );
};

export const SheetClose = ({
    className,
    children,
    asChild,
}: {
    className?: string;
    children?: React.ReactNode;
    asChild?: boolean;
}) => {
    const context = React.useContext(SheetContext);
    if (!context) throw new Error("SheetClose must be used within a Sheet");
    const { setOpen } = context;

    const handleClick = () => setOpen(false);

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
            onClick: (e: React.MouseEvent) => {
                (children.props as { onClick?: React.MouseEventHandler }).onClick?.(e);
                handleClick();
            },
        });
    }

    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    );
};

export const SheetTrigger = ({
    asChild,
    children,
}: {
    asChild?: boolean;
    children: React.ReactNode;
}) => {
    const context = React.useContext(SheetContext);
    if (!context) throw new Error("SheetTrigger must be used within a Sheet");

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler }>, {
            onClick: (e: React.MouseEvent) => {
                (children.props as { onClick?: React.MouseEventHandler }).onClick?.(e);
                context.setOpen(true);
            },
        });
    }

    return (
        <button onClick={() => context.setOpen(true)}>{children}</button>
    );
};

export const SheetContent = ({
    side = "bottom",
    className,
    children,
}: {
    side?: "bottom" | "left" | "right" | "top";
    className?: string;
    children: React.ReactNode;
}) => {
    const context = React.useContext(SheetContext);
    if (!context) throw new Error("SheetContent must be used within a Sheet");
    const { open, setOpen } = context;

    if (!open) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={() => setOpen(false)}
            />
            <div
                className={cn(
                    "fixed z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out",
                    side === "bottom" && "inset-x-0 bottom-0 border-t",
                    className
                )}
            >
                <div className="relative h-full">
                    <button
                        onClick={() => setOpen(false)}
                        className="absolute left-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
};

export const SheetHeader = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => (
    <div
        className={cn(
            "flex flex-col space-y-2 text-center sm:text-left p-4",
            className
        )}
    >
        {children}
    </div>
);

export const SheetTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => (
    <h3
        className={cn(
            "text-lg font-semibold text-slate-950",
            className
        )}
    >
        {children}
    </h3>
);
