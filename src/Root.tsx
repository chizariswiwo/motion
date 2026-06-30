import React from 'react';
import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
import {MashopPromo} from './mashop/MashopPromo';
import {Motion2} from './mashop/Motion2';
import {BrowserType} from './mashop/BrowserType';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="BrowserType"
				component={BrowserType}
				durationInFrames={210}
				width={1920}
				height={1080}
				fps={30}
				defaultProps={{}}
			/>
			<Composition
				id="Motion2"
				component={Motion2}
				durationInFrames={600}
				width={3840}
				height={2160}
				fps={60}
				defaultProps={{}}
			/>
			<Composition
				id="MashopPromo"
				component={MashopPromo}
				durationInFrames={300}
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
