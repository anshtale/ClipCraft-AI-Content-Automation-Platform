import CtaSection from "./_components/home_page/ctaSection";
import FeaturesSection from "./_components/home_page/featureSection";
import Footer from "./_components/home_page/footer";
import HeroSection from "./_components/home_page/heroSection";
import NavBar from "./_components/home_page/navBar";
import PricingSection from "./_components/home_page/pricingSection";
import ShowcaseSection from "./_components/home_page/showcaseSection";
import SocialProofSection from "./_components/home_page/socialProofSection";
import TemplatesSection from "./_components/home_page/templatesSection";
import VideoSection from "./_components/home_page/videoSection";

const Page = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white w-full">
      <div className="w-full flex items-center justify-center">
        <NavBar />
      </div>
      <main className="m-2 justify-center flex flex-col min-h-screen">
          <HeroSection />
          <VideoSection />
          <SocialProofSection />
          {/* <ShowcaseSection /> */}
          <FeaturesSection />
          <TemplatesSection />
          <PricingSection/>
          <CtaSection />
      </main>
    </div>
  );
};

export default Page;