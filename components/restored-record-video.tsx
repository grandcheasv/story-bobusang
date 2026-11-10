import { getYouTubeEmbedUrl } from "../lib/youtube";

export default function RestoredRecordVideo({ videoUrl, title }: { videoUrl: string; title: string }) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);

  return embedUrl ? (
    <iframe
      title={title}
      src={embedUrl}
      loading="lazy"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      className="aspect-video w-full border-0 bg-[#4a3022]"
    />
  ) : (
    <div className="flex aspect-video w-full items-center justify-center border border-dashed border-[#b59670] bg-[#f0e0c1]/70 px-4 text-center font-story text-lg font-bold text-[#765a44]">
      복원된 기록 영상 준비 중
    </div>
  );
}
