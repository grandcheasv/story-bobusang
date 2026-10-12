import BottomNavigation from "../../components/bottom-navigation";
import LastMissionPathTracker from "../../components/last-mission-path-tracker";

export default function MissionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="tour-shell">
      {children}
      <LastMissionPathTracker />
      <BottomNavigation />
    </div>
  );
}
