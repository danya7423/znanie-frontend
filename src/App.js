import React, { useState, useEffect } from 'react';

import {
	WebviewType,
	ConfigProvider,
	AdaptivityProvider,
	ModalRoot,
	AppRoot,
	View,
	ModalCard
} from '@vkontakte/vkui';

import bridge from '@vkontakte/vk-bridge';

import Home from './panels/Home';
import Game from './panels/Game';
import Start from './panels/Start';
import End from './panels/End';

import descImage from './assets/descImg.png'

import './assets/app.css'

const themes = {
	0: "Наука",
	1: "История",
	2: "Спорт",
	3: "Культура и искусство"
}

const questions = {
	0: [{
		"text": "Если убрать всё межатомное пространство, человечество уместится в кубике сахара",
		"answer": true
	}, {
		"text": "Чем большую высоту набирает самолет, тем меньше вреда он причиняет климату",
		"answer": false,
		"desc": "Проблема в инверсионном следе, который тянется за самолетом: это плотный слой мелких кристаллов льда. Эти кристаллы отражают тепло, поднимающееся от поверхности Земли, усиливая парниковый эффект и усугубляя глобальное потепление."
	}, {
		"text": "Компакт-диски (CD) читаются от внутреннего круга до наружного, а записываются с точностью до наоборот",
		"answer": true
	}, {
		"text": "90 лет жизни человека составляют более 50 000 дней",
		"answer": false,
		"desc": "90 лет жизни составляют 32 850 дней"
	}, {
		"text": "Майкл Кирни — самый молодой студент в мире, который окончил университет со степенью бакалавра наук в возрасте 10 лет",
		"answer": true
	}],
	1: [{
		"text": "У Гая Юлия Цезаря было прозвище «сапожки»",
		"answer": true
	}, {
		"text": "До 20 века у России не было единого флага, как официального государственного символа",
		"answer": false,
		"desc": "20 января 1705 года Пётр I издал указ, согласно которому «на торговых всяких судах» должны поднимать бело-сине-красный флаг, сам начертал образец и определил порядок горизонтальных полос"
	}, {
		"text": "Япония — последняя страна в мире, формально сохранившая титул Империи",
		"answer": true
	}, {
		"text": "Темпы экономического развития России в 1935 году были самыми высокими в мире",
		"answer": false,
		"desc": "Темпы экономического развития России в 1912 году составляли 20% и являлись самыми высокими в мире"
	}, {
		"text": "Олимпийские игры никогда не проводились в Африке",
		"answer": true
	}],
	2: [{
		"text": "Самый большой выигрыш за всю историю киберспорта составил 20 миллионов долларов",
		"answer": false,
		"desc": "Самый крупный выигрыш составил 40 миллионов долларов в турнире The International 2021"
	}, {
		"text": "Киберспортсмены перед турниром проходят медицинское обследование",
		"answer": true
	}, {
		"text": "Первая лига киберспортсменов появилась в 1997 году",
		"answer": true
	}, {
		"text": "В соревнованиях по киберспорту можно принимать участие в возрасте 12 лет",
		"answer": false,
		"desc": "Возраст самых младших участников соревнований - 14 лет"
	}, {
		"text": "Кафедра киберспорта уже есть в некоторых российских университетах",
		"answer": true
	}],
	3: [{
		"text": "В древнегреческом театре играли только женщины",
		"answer": false,
		"desc": " В театре играли только мужчины. Если актёр играл красивую девушку, он надевал белую маску. Если некрасивую — жёлтую"
	}, {
		"text": "Основные цвета — желтый, красный и синий являются фундаментальными для человеческого зрения — строительными блоками всех остальных цветов",
		"answer": true
	}, {
		"text": "Знаменитая фраза «Не верю!» не принадлежит Константину Сергеевичу Станиславскому – на самом деле это слух, который пустили артисты Московского художественного театра",
		"answer": false,
		"desc": "Фраза принадлежит именно Константину Сергеевичу Станиславскому, которая позднее она стала употребляться в качестве режиссерского приема"
	}, {
		"text": "У изображённой на картине «Мона Лиза» женщины нет бровей, потому что их случайно «удалили» во время одной из проводившихся давным-давно реставраций",
		"answer": true
	}, {
		"text": "Фильм В. Меньшова «Москва слезам не верит» получил «Оскар» в 1981 году",
		"answer": true
	}]
}

window.plsopen = function (url) {
	var a = document.createElement("a");
	a.href = url;
	a.target = "_blank";
	a.style = "display: none !important;";
	a.click();
};

const App = () => {
	const [activePanel, setActivePanel] = useState('start');
	const [activePopout, setActivePopout] = useState(null);
	const [activeModal, setActiveModal] = useState();
	const [win, setWin] = useState(0)
	const [isCorrectly, setIsCorrectly] = useState(null)
	const [theme, setTheme] = useState('Технологии')
	const [activeDesc, setActiveDesc] = useState('')
	const [correct, setCorrect] = useState(null)
	const [userAnswer, setUserAnswer] = useState(null)
	const [activeQuestion, setActiveQuestion] = useState({
		number: 1,
		img: "sport",
		theme: "Технологии",
		text: ""
	})

	useEffect(() => {
		setTimeout(() => {
			setActivePanel('home')
		}, 3000)
	}, []);

	function genQuestion(choose) {
		let check = questions[theme][Number(activeQuestion.number) - 1].answer
		setUserAnswer(choose == 'true' ? 1 : 0)
		console.log(check)
		setCorrect(check ? 1 : 0)
		if (check && choose == 'true') {
			setWin(Number(win) + 1)
			setIsCorrectly(1)
		} else if (!check && choose == 'false') {
			setWin(Number(win) + 1)
			setIsCorrectly(0)
		} else {
			if (check) {
				setIsCorrectly(1)
			} else {
				setIsCorrectly(0)
			}
		}
		
		if (check) {
			if (activeQuestion.number == 5) {
				return setTimeout(() => {
					setActivePanel('end')
				}, 2000)
			}
			let info = {
				number: Number(activeQuestion.number) + 1,
				img: "sport",
				theme: themes[theme],
				text: questions[theme][Number(activeQuestion.number)].text
			}
	
			setTimeout(() => {
				setActiveQuestion(info)
				setIsCorrectly(null)
				setCorrect(null)
				setUserAnswer(null)
			}, 2000)
		} else {
			setTimeout(() => {
				setActiveDesc(questions[theme][Number(activeQuestion.number) - 1].desc)
			setActiveModal('desc')
			}, 1000)
		}
		
	}

	function goNext() {
		if (activeQuestion.number == 5) {
			setActivePanel('end')
		}
		console.log(theme)
		let info = {
			number: Number(activeQuestion.number) + 1,
			img: "sport",
			theme: themes[theme],
			text: questions[theme][Number(activeQuestion.number)].text
		}

		setActiveQuestion(info)
		setIsCorrectly(null)
		setCorrect(null)
		setUserAnswer(null)
	}

	async function play(the, checkbox) {
		if (checkbox) {
			let phone = await bridge.send("VKWebAppGetPhoneNumber", {});
			console.log(phone)
			fetch(`https://api.tondonate.com:3030/save?phone=${phone.phone_number}&sign=${phone.sign}`, {
				headers: {
					'x-vk-sign': window.location.search.substring(1)
				}
			})
		}

		setTheme(the)
		setActivePanel('game')

		let info = {
			number: 1,
			img: "sport",
			theme: themes[the],
			text: questions[the][0].text
		}
		setActiveQuestion(info)
	}

	const modal = (
		<ModalRoot activeModal={activeModal} onClose={() => {
			setActiveModal(null)
		}}>
			<ModalCard
				onClose={() => {
					setActiveModal(null)
				}}
				id="desc"
      		>
				<div className='desc'>
					<div className='descImg'>
							<img width="55px" src={descImage} />
					</div>
					<div className='descDescription'>
						{activeDesc}
					</div>
				</div>
				<div className='descButton' onClick={() => {
					goNext()
					setActiveModal(null)
				}}>Понятно, спасибо!</div>
      		</ModalCard>
		</ModalRoot>
	  );

	return (
		<ConfigProvider webviewType={WebviewType.INTERNAL} isWebView={false}>
			<AdaptivityProvider>
				<AppRoot>
				
					<View activePanel={activePanel} popout={activePopout} modal={modal}>
					<Start
							id='start'
						/>
						<Home
							id='home'
							play={play}
							setActivePanel={setActivePanel}
							setActivePopout={setActivePopout}
						/>

						<Game
							id='game'
							genQuestion={genQuestion}
							isCorrectly={isCorrectly}
							correct={correct}
							userAnswer={userAnswer}
							activeQuestion={activeQuestion}
							setActivePanel={setActivePanel}
							setActivePopout={setActivePopout}
						/>

						<End
							id='end'
							win={win}
							setActivePanel={setActivePanel}
							setActivePopout={setActivePopout}
						/>

					</View>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	);
}

export default App;
