import React, { useEffect, useState } from 'react';

import {
	Panel,
	PanelHeader,
	FixedLayout,
	Checkbox,
} from '@vkontakte/vkui';

import {motion, AnimatePresence} from "framer-motion";

import user from '../assets/boy.png'
import history from '../assets/history.png'
import sport from '../assets/sport.png'
import film from '../assets/film.png'

import back from '../assets/back.png'
import next from '../assets/next.png'
import microscope from '../assets/microscope.png'

import '../assets/home.css'

const Home = props => {

	const [selected, setSelected] = useState(0)
	const [checked, setChecked] = useState(false)

	useEffect(() => {
		
	})
	return (
		<Panel id={props.id}>
			<PanelHeader separator={false}>
				
			</PanelHeader>
			
			<div className='home'>
				<AnimatePresence exitBeforeEnter={true}>
					<motion.div
						initial={{ opacity: 0, x: -100 }}
						animate={{ scale: 1, opacity:1, x:0 }}
						exit={{}}
					>
						<div className='homeHeader'>Только 1 из 10 отличит правду😇 от лжи😈</div>
					</motion.div>
				</AnimatePresence>
				<motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ scale: 1, opacity:1, x:0 }}
                    exit={{}}
                >
					<div className='homeDescription'>Проверь себя и получи шанс выиграть призы!</div>
				</motion.div>
			</div>

			<div className='user'>
				<motion.div initial={{scale:1.1,opacity:0}} animate={{opacity: [0,1], scale:[1.1,1]}}>
					<img onmousedown={(e) => {
						e.preventDefault()
					}} src={user} />
				</motion.div>		
			</div>

			<FixedLayout vertical='bottom'>
				<motion.div
                    initial={{ opacity: 0, y: 1000 }}
                    animate={{ scale: 1, opacity:1, y:0 }}
                    exit={{}}
                >
					<div className='cardBox'>
						<div className='back' onClick={() => {
							if (selected == 0) {
								setSelected(3)
							} else {
								setSelected(selected - 1)
							}
						}}>
							<img onmousedown={(e) => {
								e.preventDefault()
							}} src={back} />
						</div>
						{selected == 0 && <div className='box'>
							<div className='boxHeader'>
								Наука и<br />технологии
							</div>
							<div className='boxImage'>
								<img width='90px' height='119px' onmousedown={(e) => {
									e.preventDefault()
								}} src={microscope} />
							</div>
						</div>}
						{selected == 1 && <div className='box'>
							<div className='boxHeader'>
								История
							</div>
							<div className='boxImage'>
								<img width='110.96px' height='99.14px' onmousedown={(e) => {
									e.preventDefault()
								}} src={history} />
							</div>
						</div>}
						{selected == 2 && <div className='box'>
							<div className='boxHeader'>
								Спорт
							</div>
							<div className='boxImage'>
								<img width='93px' height='89px' onmousedown={(e) => {
									e.preventDefault()
								}} src={sport} />
							</div>
						</div>}
						{selected == 3 && <div className='box'>
							<div className='boxHeader'>
								Культура и искусство
							</div>
							<div className='boxImage'>
								<img width='131px' onmousedown={(e) => {
									e.preventDefault()
								}} src={film} />
							</div>
						</div>}

						<div className='next' onClick={() => {
							if (selected == 3) {
								setSelected(0)
							} else {
								setSelected(selected + 1)
							}
						}}>
							<img onmousedown={(e) => {
								e.preventDefault()
							}} src={next} />
						</div>
					</div>
					<div className='button' onClick={() => {
						props.play(selected, checked)
					}}>Играть</div>

					<div className='center'>
						<Checkbox onChange={(e) => setChecked(e.target.checked)}>Разрешить обработку персональных данных</Checkbox>
					</div>
				</motion.div>
			</FixedLayout>
		</Panel>
	);
}

export default Home;
