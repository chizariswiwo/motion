import React from 'react';
import {createRoot} from 'react-dom/client';
import {Player} from '@remotion/player';
import {MashopPromo} from '../src/mashop/MashopPromo';

const App: React.FC = () => {
	return (
		<>
			<h1>mashop — aperçu de l'animation</h1>
			<p className="sub">
				Lecteur interactif · lecture / pause / défilement de la timeline · 1920×1080 · 15&nbsp;s
			</p>
			<div
				style={{
					borderRadius: 14,
					overflow: 'hidden',
					boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
					border: '1px solid #21262d',
				}}
			>
				<Player
					component={MashopPromo}
					durationInFrames={450}
					fps={30}
					compositionWidth={1920}
					compositionHeight={1080}
					style={{width: '100%'}}
					controls
					loop
					autoPlay
				/>
			</div>
		</>
	);
};

createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
