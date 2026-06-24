import React from 'react';
import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {MashopPromo} from './mashop/MashopPromo';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="MashopPromo"
				component={MashopPromo}
				durationInFrames={480}
				width={1920}
				height={1080}
				fps={30}
				defaultProps={{}}
			/>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				width={1920}
				height={1080}
				fps={30}
				defaultProps={{
					title: 'Hello, Remotion',
					subtitle: 'Built with the remotion skill',
				}}
			/>
		</>
	);
};
