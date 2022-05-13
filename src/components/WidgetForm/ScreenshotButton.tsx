import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface Props {
  onSetScreenshot: (screenShot: string | null) => void;
  screenShot: string | null;
}

export function ScreenshotButton({ onSetScreenshot, screenShot }: Props) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);


  async function handleScreenshot() {
    setIsTakingScreenshot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");
    onSetScreenshot(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenShot) {
    return (
      <button
        type="button"
        onClick={() => onSetScreenshot(null)}
        style={{
          backgroundImage: `url(${screenShot})`,
        }}
        className="p-1 h-10 w-10 border-transparent roudend-[4px] flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <Trash weight="fill" />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={handleScreenshot}
      className="p-2 rounded-[4px] bg-zinc-800 border-transparent transition-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 "
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
}
