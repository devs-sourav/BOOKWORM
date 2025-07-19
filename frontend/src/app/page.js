import AdsBanner from "@/components/home/AdsBanner";
import BannerSection from "@/components/home/BannerSection";
import LatestNews from "@/components/home/LatestNews";
import NewArival from "@/components/home/NewArival";
import RomanceSection from "@/components/home/RomanceSection";
import { WeeklyDeal } from "@/components/home/WeeklyDeal";

export default function Home() {
  return (
    <div>
      <BannerSection />
      <NewArival/>
      <WeeklyDeal/>
      <RomanceSection/>
      <AdsBanner/>
      <LatestNews/>
    </div>
  );
}
