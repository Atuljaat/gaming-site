'use client';

import React from 'react';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
            <div className="w-full max-w-[400px] space-y-6">
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="p-2 bg-primary rounded-lg">
                            <Gamepad2 className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold">NexusGaming</span>
                    </Link>
                </div>

                {children}

                <div className="text-center text-sm text-muted-foreground mt-8">
                    &copy; 2024 NexusGaming. All rights reserved.
                </div>
            </div>
        </div>
    );
}
