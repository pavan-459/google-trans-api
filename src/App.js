import { useEffect, useState } from 'react'
import TextBox from './components/textbox'
import Modal from './components/modal'
import Arrows from './components/arrows'
import Button from './components/button'
import axios from 'axios'

const App = () => {
  const [showModal, setShowModal] = useState(false)
  const [languages, setLanguages] = useState([])
  const [inputLanguage, setInputLanguage] = useState('English')
  const [outputLanguage, setOutputLanguage] = useState('Polish')
  const [textToTranslate, setTextToTranslate] = useState('')
  const [translatedText, setTranslatedText] = useState('')


  const getLanguages = async () => {
    const response = await axios.get('https://localhost:8000/languages')
    setLanguages(response.data)
  }
  useEffect(() => {
    getLanguages()
  }, [])

  const translate = async () => {
    console.log('translate')
    const data = {
      textToTranslate, outputLanguage, inputLanguage
    }
    const response = await axios.get('https://localhost:8000/translation', {
      params : data
    })
    console.log('response', response)
    setTranslatedText(response.data)
  }

  const handleClick = () => {
    setInputLanguage(outputLanguage)
    setOutputLanguage(inputLanguage)
  }

  return (
    <div className="app">
      {!showModal && (
        <>
          <TextBox
            // eslint-disable-next-line react/style-prop-object
            style="input"
            setShowModal={setShowModal}
            selectedLanguage={inputLanguage}
            setTextToTranslate={setTextToTranslate}
            textToTranslate={textToTranslate}
            setTranslatedText={setTranslatedText}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>
          <TextBox
            // eslint-disable-next-line react/style-prop-object
            style="output"
            setShowModal={setShowModal}
            selectedLanguage={outputLanguage}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={translate}>
            <Button />
          </div>
        </>
      )}
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          languages={languages}
          chosenLanguage={
            showModal === 'input' ? inputLanguage : outputLanguage
          }
          setChosenLanguage={
            showModal === 'input' ? setInputLanguage : setOutputLanguage
          }
        />
      )}
    </div>
  )
}

export default App