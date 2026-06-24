import React from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {MashopPromo} from '../src/mashop/MashopPromo';
import logo from '../src/mashop/assets/logo.png';

const videoUrl = `${import.meta.env.BASE_URL}MashopPromo.mp4`;

const App: React.FC = () => {
	return (
		<>
			<div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4}}>
				<img src={logo} alt="mashop" style={{height: 30, background: '#fff', borderRadius: 6, padding: '4px 8px'}} />
				<h1 style={{margin: 0}}>aperçu de l'animation</h1>
			</div>
			<p className="sub">Lecteur interactif · lecture / pause / défilement · 1920×1080 · 10&nbsp;s</p>
			<div style={{borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.5)', border: '1px solid #21262d'}}>
				<Player
					component={MashopPromo}
					durationInFrames={300}
					fps={30}
					compositionWidth={1920}
					compositionHeight={1080}
					style={{width: '100%'}}
					initialFrame={150}
					controls
					loop
					autoPlay
				/>
			</div>
			<div style={{marginTop: 16}}>
				<a
					href={videoUrl}
					download="mashop-promo.mp4"
					style={{
						display: 'inline-block',
						background: '#F07F1A',
						color: '#fff',
						fontWeight: 700,
						fontSize: 15,
						textDecoration: 'none',
						padding: '12px 22px',
						borderRadius: 10,
					}}
				>
					⬇️ Télécharger la vidéo (MP4)
				</a>
			</div>
		</>
	);
};

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
