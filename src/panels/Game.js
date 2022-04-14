import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

import {
	Panel,
	PanelHeader
} from '@vkontakte/vkui';

import {motion} from "framer-motion";

import history from '../assets/history.png'
import sport from '../assets/sport.png'
import film from '../assets/film.png'

import microscope from '../assets/microscope.png'

import '../assets/game.css'

const Home = props => {
    const [color, setColor] = useState("")
    useEffect(() => {
        if (props.correct == null) {
          setColor("")
        } else {
          console.log(props.correct)
          console.log(props.userAnswer)
          if (props.correct == props.userAnswer) {
            setColor('#2AD28C')
          } else {
            setColor("#E94256")
          }
        }
    }, [props.correct])
    
	  return (
		  <Panel id={props.id}>
        <PanelHeader separator={false}>
				
        </PanelHeader>

        <div className='gameHeader'>
          <div className='left'>
            {props.activeQuestion.number}/5
          </div>
          <div className='right'>
            {props.activeQuestion.theme}
          </div>
        </div>

        <div className='card' style={{ background: color }}>
          {props.activeQuestion.theme == 'Спорт' && <img onmousedown={(e) => {
						e.preventDefault()
					}} width='93px' height='89px' src={sport} />}
          {props.activeQuestion.theme == 'История' && <img onmousedown={(e) => {
						e.preventDefault()
					}} width='110.96px' height='99.14px' src={history} />}
          {props.activeQuestion.theme == 'Наука' && <img onmousedown={(e) => {
						e.preventDefault()
					}} width='90px' height='119px' src={microscope} />}
          {props.activeQuestion.theme == 'Культура и искусство' && <img onmousedown={(e) => {
						e.preventDefault()
					}} width='131px' src={film} />}
          <motion.div initial={{scale:1.1,opacity:0}} animate={{opacity: [0,1], scale:[1.1,1]}}> <div className='cardText'>
            {props.activeQuestion.text}
          </div></motion.div>
        </div>

        <div className='select'>
          <div className='true' style={{ background: props.userAnswer == 1 && color }} onClick={() => {
            if (props.isCorrectly == 0 || props.isCorrectly == 1) return
            props.genQuestion('true')
          }}>
            <div className='trueText'>Правда</div>
          </div>
          <div className='center' onClick={() => {
             if (props.isCorrectly == 0 || props.isCorrectly == 1) return
          }}>
            Выбери<br /> вариант ответа
          </div>
          <div className='false' style={{ background: props.userAnswer == 0 && color }} onClick={() => {
            if (props.isCorrectly == 0 || props.isCorrectly == 1) return
            props.genQuestion('false')
          }}>
            <div className='falseText'>Ложь</div>
          </div>
        </div>
		  </Panel>
	);
}

export default Home;
