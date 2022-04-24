import MarkdownRenderer from "../../Components/Commons/MarkdownRenderer";
import { useEffect, useState } from "react";

function QuickStart() {
  const [installMarkdownText, setMarkdownText] = useState<string>('')
  const [excuteMarkdownText, setExcuteMarkdownText] = useState<string>('')

  useEffect(() => {

    fetch(require('../../Assets/Text/installQuickstart.md'))
    .then(res => res.text())
    .then(text => setMarkdownText(text))
    
    fetch(require('../../Assets/Text/excuteQuickstart.md'))
    .then(res => res.text())
    .then(text => setExcuteMarkdownText(text))

  }, []);

  return (
    <>
      <div style={{width: '80%'}} className="mx-auto">
        <div id="install" className="m-5">
          <MarkdownRenderer  text={installMarkdownText} />
        </div>
        <div id="execute" className="m-5">
          <MarkdownRenderer text={excuteMarkdownText} />
        </div>
      </div>
    </>
  );
}

export default QuickStart;
