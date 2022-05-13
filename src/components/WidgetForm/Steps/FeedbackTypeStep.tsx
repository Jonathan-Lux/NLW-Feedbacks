import { feedbackTypes, TypesFeedback } from "..";
import { CloseButton } from "../../CloseButton";

interface Props {
  onSetFeedback: (type: TypesFeedback) => void;
}

export function FeedbackTypeStep({ onSetFeedback }: Props) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              onClick={() => onSetFeedback(key as TypesFeedback)}
              key={key}
              className="bg-zinc-800 py-5 rounded-lg flex items-center flex-col flex-1 gap-2 w-24 border-2 border-transparent hover:border-brand-500 focus:outline-none focus:border-brand-500"
            >
              <img src={value.image.source} alt={value.image.alt} />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
