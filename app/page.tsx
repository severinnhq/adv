import dynamic from "next/dynamic";

const MirathelleAdvert = dynamic(() => import("@/components/MirathelleAdvert"), {
  ssr: false,
});

export default function Page() {
  return <MirathelleAdvert />;
}