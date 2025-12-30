"use client";

import { FollowerPointerCard } from "@/components/ui/following-pointer";

export default function FollowingPointerDemo() {
    return (
        <div className="flex items-center justify-center h-[40rem] bg-gray-900 rounded-2xl border border-white/10 m-4">
            <FollowerPointerCard
                title={
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-yellow-400" />
                        <p className="text-white font-medium">Umrah Guide</p>
                    </div>
                }
                className="w-full h-full flex items-center justify-center"
            >
                <div className="text-center p-10">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Custom Following Pointer
                    </h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Hover over this area to see the custom pointer in action. We&apos;ve removed the card content to focus purely on the interaction.
                    </p>
                </div>
            </FollowerPointerCard>
        </div>
    );
}
