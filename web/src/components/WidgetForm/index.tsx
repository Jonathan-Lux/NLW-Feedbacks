import bugImageUrl from "../../assets/Bug.svg"
import IdeaImageUrl from "../../assets/Idea.svg"
import ThoughtImageUrl from "../../assets/Thought.svg"
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentSetp } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessSetp } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes ={
  BUG:{
    title: "Problema",
    image:{
      source:bugImageUrl,
      alt: "Imagem de um inseto",
      typePlaceholder:"Escreva detalhadamente o seu problema"
    }
  },
  IDEA:{
    title: "Ideia",
    image:{
      source:IdeaImageUrl,
      alt: "Imagem de uma lâmpada",
      typePlaceholder:"Escreva detalhadamente a sua ideia"
    }
  },
  OTHER:{
    title: "Outro",
    image:{
      source:ThoughtImageUrl,
      alt: "Imagem de uma nuvem",
      typePlaceholder:"Escreva detalhadamente o que está acontecendo"
    }
  }
}

export type  TypesFeedback = keyof typeof feedbackTypes

export function WidgetForm() {
  const [feedback,setFeedBack] = useState<TypesFeedback | null>(null)
  const [feedbackSend,setFeedbackSend] = useState(false)

  function handleRestartFeedback(){
    setFeedbackSend(false)
    setFeedBack(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 items-center flex flex-col shadow-lg w-[calc(100vw-2rem)] md:w-auto ">
      {feedbackSend ? <FeedbackSuccessSetp onHandleRestartFeedback={handleRestartFeedback}/> : 
      <>
      {!feedback ? (
        <FeedbackTypeStep onSetFeedback={setFeedBack}/>
      ) :(
      <FeedbackContentSetp onSetFeedbackSend={()=>setFeedbackSend(true)} onHandleRestartFeedback={handleRestartFeedback} feedback={feedback}/>
      )}
      </>}
      <footer className="text-xs text-neutral-400">Feito por <a className="underline underline-offset-1" href="https://jonathanluxportfolio.herokuapp.com/">Jonathan Lux </a></footer>
    </div>
  );
}
