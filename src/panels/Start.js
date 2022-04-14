import React, { useEffect, useState } from 'react';

import {
	Panel
} from '@vkontakte/vkui';

import {motion} from "framer-motion";

import logo from '../assets/logo.svg'

const Home = props => {

    useEffect(() => {
        
    }, [])
    
	return (
		<Panel id={props.id}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: "100vh" }}>
            	<motion.div initial={{scale:1.1,opacity:0}} animate={{opacity: [0,1], scale:[1.1,1]}}>
                	<img src={logo} />
                </motion.div>
            </div>
		</Panel>
	);
}

export default Home;
