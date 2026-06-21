"use client"

import {useState} from "react";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


export const TanstackProvider = ({ children }: { children: React.ReactNode }) => {
        const [queryClient] = useState(
            () =>
                new QueryClient({
                    defaultOptions: {
                        queries: {
                            // Avoid aggressive background refetches default behavior if desired
                            staleTime: 60 * 1000,
                        },
                    },
                })
        );

        return (
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        );
    }
