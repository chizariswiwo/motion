import React from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {MashopPromo} from '../src/mashop/MashopPromo';
import {Motion2} from '../src/mashop/Motion2';
import logo from '../src/mashop/assets/logo.png';

const url = (name: string) => `${import.meta.env.BASE_URL}${name}`;

const Download: React.FC<{href: string; name: string}> = ({href, name}) => (
	<a
		href={href}
		download={name}
		style={{
			display: 'inline-block',
			background: '#E9A911',
			color: '#0d1117',
			fontWeight: 700,
			fontSize: 15,
			textDecoration: 'none',
			padding: '12px 22px',
			borderRadius: 10,
			marginTop: 14,
		}}
	>
		⬇️ Télécharger (MP4)
	</a>
);

const App: React.FC = () => {
	return (
		<>
			<div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14}}>
				<img src={logo} alt="mashop" style={{height: 30, background: '#fff', borderRadius: 6, padding: '4px 8px'}} />
				<h1 style={{margin: 0}}>aperçus des animations</h1>
			</div>

			<h2 style={{fontSize: 16, margin: '8px 0 4px'}}>Motion 2 — lancement cinématique (4K · 60fps · 10 s)</h2>
			<p className="sub">Lecteur interactif · rendu vectoriel temps réel</p>
			<div style={{borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', border: '1px solid #21262d'}}>
				<Player component={Motion2} durationInFrames={600} fps={60} compositionWidth={3840} compositionHeight={2160} style={{width: '100%'}} initialFrame={30} controls loop autoPlay />
			</div>
			<Download href={url('Motion2.mp4')} name="mashop-motion2.mp4" />

			<h2 style={{fontSize: 16, margin: '34px 0 4px'}}>Motion 1 — assemblage des téléphones (16:9 · 10 s)</h2>
			<div style={{borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', border: '1px solid #21262d'}}>
				<Player component={MashopPromo} durationInFrames={300} fps={30} compositionWidth={1920} compositionHeight={1080} style={{width: '100%'}} initialFrame={150} controls loop />
			</div>
			<Download href={url('MashopPromo.mp4')} name="mashop-motion1.mp4" />
		</>
	);
};

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
