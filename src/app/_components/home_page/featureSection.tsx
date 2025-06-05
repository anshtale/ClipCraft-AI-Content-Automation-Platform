import React from "react";
import {
    Film,
    MessageSquare,
    TrendingUp,
    Image,
    Video,
    Star,
    Share
} from "lucide-react";

const features = [
    {
        icon: <MessageSquare className="h-8 w-8 text-violet-400" />,
        title: "AI-Powered Captions",
        description: "Generate accurate captions that keep viewers engaged from start to finish."
    },
    {
        icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
        title: "Viral Templates",
        description: "Choose from dozens of templates proven to increase engagement and views."
    },
    {
        icon: <Share className="h-8 w-8 text-cyan-400" />,
        title: "One-Click Export",
        description: "Export your viral-ready content to all major platforms with perfect optimization."
    }
];

export const FeaturesSection = () => {
    return (
        <section id="features" className="w-full flex flex-col items-center py-24 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
            <div className="container">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                        Every feature you need
                    </h2>
                    <p className="text-white/70">
                        ReelReady combines all the tools you need to create engaging viral-worthy content without the hassle
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <div className="grid grid-cols-1 content-center sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                            >
                                <div className="mb-5 p-3 rounded-lg inline-block bg-white/5">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-white/70">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;