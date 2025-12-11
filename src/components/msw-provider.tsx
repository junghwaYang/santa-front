"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
    const [mockingEnabled, setMockingEnabled] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
            // Import worker dynamically to avoid server-side issues
            import("../mocks/browser").then(async ({ worker }) => {
                await worker.start({
                    onUnhandledRequest: "bypass",
                });
                setMockingEnabled(true);
                console.log("[MSW] Mocking enabled");
            });
        } else {
            setMockingEnabled(true);
        }
    }, []);

    if (!mockingEnabled) {
        return null; // Or a loading spinner if critical
    }

    return <>{children}</>;
}
