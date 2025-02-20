import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const useVoice = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();


    // 音声認識が停止した場合に連続して音声認識を開始
    useEffect(() => {
        // 音声認識がサポートされていない場合
        if (!browserSupportsSpeechRecognition) {
            console.log("このブラウザは音声認識をサポートしていません");
            return;
        }

        // 音声認識が停止しているときに開始
        if (!listening) {
            console.log("音声認識開始");
            SpeechRecognition.startListening({ continuous: true, language: "ja-JP" });
        }
    }, [listening, browserSupportsSpeechRecognition]);

    return {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        startListening: () => SpeechRecognition.startListening({ continuous: true, language: "ja-JP" }),
        stopListening: SpeechRecognition.stopListening,
    };
}

export default useVoice;
