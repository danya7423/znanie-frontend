import React, { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

import {
	Panel,
	PanelHeader,
    Card,
    CardGrid
} from '@vkontakte/vkui';

import { Icon28TshirtOutline } from '@vkontakte/icons';
import { Icon28PlaneOutline } from '@vkontakte/icons';
import { Icon28WorkOutline } from '@vkontakte/icons';

import end from '../assets/end.png'
import logo from '../assets/logo.svg'

import '../assets/end.css'

const Home = props => {

    useEffect(() => {
        
    }, [])
    
	return (
		<Panel id={props.id}>
            <PanelHeader separator={false}>
                    
            </PanelHeader>

            <div className='logo'>
                <img onmousedown={(e) => {
					e.preventDefault()
				}} src={logo} />
            </div>
            <div className='endBox1'>
                <img onmousedown={(e) => {
					e.preventDefault()
				}} src={end} width="66px" />
                <div className='title'>Твой результат — {props.win}/5 верных ответов</div>
            </div>

            <div className='endBox2'>
                <div className='title'>
                    Докажи, что ты – мегамозг! <br />
                    Участвуй в Просветительских играх <br />
                    «Новое Знание»!
                </div>
                <div className='description'>Ценные призы и путешествие мечты <br />уже ждут тебя!</div>
                <div className='buttonEnd' onClick={() => {
                    window.plsopen('https://igry.znanierussia.ru/?utm_source=VK&utm_medium=specialproject&utm_campaign=novoeznanye&utm_content=miniapp')
                }}>Участвовать</div>
               
                <CardGrid size="s" style={{ width: "100%", marginBottom: "24px" }}>
                    <Card style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', background: 'transparent' }}>
                        <center><Icon28PlaneOutline fill="#FFFFFF" /></center>
                        <div className='prizesText'>Путешествия</div>
                    </Card>
                    <Card style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', background: 'transparent' }}>
                        <center><Icon28TshirtOutline fill="#FFFFFF" /></center>
                        <div className='prizesText'>Мерч</div>
                    </Card>
                    <Card style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', background: 'transparent' }}>
                        <center><Icon28WorkOutline fill="#FFFFFF" /></center>
                        <div className='prizesText'>Стажировки</div>
                    </Card>
                </CardGrid>
            </div>
		</Panel>
	);
}

export default Home;
