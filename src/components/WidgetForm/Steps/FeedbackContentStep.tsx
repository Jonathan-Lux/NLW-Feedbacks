import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { TypesFeedback,feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface Props {
    feedback: TypesFeedback
    onHandleRestartFeedback: () => void
    onSetFeedbackSend:()=> void
}


export function FeedbackContentSetp({feedback,onHandleRestartFeedback,onSetFeedbackSend}:Props){
    const feedbackTypeInfo = feedbackTypes[feedback]
    const [screenShot, setScreenshot] = useState<string | null>(null)
    const [comment, setComment] = useState("")
    const [isSendingFeedback, setIsSendingFeedback] = useState(false)

    async function handleSubmitFeedback(event:FormEvent){
        event.preventDefault()
        setIsSendingFeedback(true)
        
        await api.post("/feedbacks",{
            type: feedback,
            comment,
            screenShot
        })

        onSetFeedbackSend()
        setIsSendingFeedback(false)
    }
    return(
        <>
        <header>
            <button className="absolute top-5 left-5 text-zinc-500 hover:text-zinc-100" 
            onClick={onHandleRestartFeedback}
            type="button">
                <ArrowLeft weight="bold" className="w-4 h-4"/>
                </button>
          <span className="text-xl mx-8 leading-6 flex items-center gap-2">
              <img className="w-6 h-6" src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
              {feedbackTypeInfo.title}
          </span>
          <CloseButton />
        </header>
        
        <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
          <textarea onChange={(event) =>setComment(event.target.value)}className="min-w-[304px] min-h-[112px] rounded-[4px] w-full pl-2 text-white bg-transparent bg-zinc-900 border-[1px] focus:border-brand-500 focus:ring-brand-500 scrollbar scrollbar-thumb-zinc-700 scrollbar-tranck-transparente scrollbar-thin"
          placeholder={feedbackTypeInfo.image.typePlaceholder}/>
          <footer className="flex gap-2 mt-2">
              <ScreenshotButton screenShot={screenShot} onSetScreenshot = {setScreenshot}/>
              <button disabled={comment.length === 0 || isSendingFeedback } type="submit" className="flex bg-brand-500 flex-1 justify-center items-center p-2 w-full border-transparent rounded-[4px] hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:bg-brand-500  ">
                {isSendingFeedback? <Loading/>: "Enviar feedback"}
              </button>
          </footer>
        </form>
        </>
    )
}