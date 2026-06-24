import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, fontFamily} from '../theme';
import {Icon} from '../Icon';
import {StatusBar} from './StatusBar';

const Stars: React.FC<{n: number; count: number}> = ({n, count}) => (
	<div style={{display: 'flex', alignItems: 'center', gap: 2}}>
		{[0, 1, 2, 3, 4].map((i) => (
			<Icon key={i} name="star" size={13} color="#F5B301" fill={i < n} strokeWidth={1.4} />
		))}
		<span style={{fontSize: 11.5, color: colors.textGray, marginLeft: 3}}>({count})</span>
	</div>
);

const CategoryCard: React.FC<{label: string; bg: string; icon: React.ComponentProps<typeof Icon>['name']; color: string}> = ({
	label,
	bg,
	icon,
	color,
}) => (
	<div
		style={{
			flex: 1,
			background: bg,
			borderRadius: 20,
			height: 132,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 14,
		}}
	>
		<div
			style={{
				width: 54,
				height: 54,
				borderRadius: '50%',
				background: 'rgba(255,255,255,0.65)',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Icon name={icon} size={26} color={color} strokeWidth={1.9} />
		</div>
		<span style={{fontSize: 14, fontWeight: 600, color: '#3a4150'}}>{label}</span>
	</div>
);

const ProductCard: React.FC<{
	name: string;
	price: string;
	old: string;
	badge: string;
	shop: string;
	stars: number;
	count: number;
	children: React.ReactNode;
}> = ({name, price, old, badge, shop, stars, count, children}) => (
	<div style={{flex: 1, background: '#fff', borderRadius: 20, padding: 12, boxShadow: '0 6px 18px rgba(20,30,60,0.06)'}}>
		<div
			style={{
				position: 'relative',
				height: 150,
				borderRadius: 14,
				background: '#F1F2F5',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden',
			}}
		>
			<div style={{position: 'absolute', top: 8, left: 8, background: colors.tintOrange, color: colors.orange, fontSize: 12, fontWeight: 800, padding: '3px 8px', borderRadius: 9}}>{badge}</div>
			<div style={{position: 'absolute', top: 6, right: 6, width: 28, height: 28, borderRadius: '50%', background: colors.navyHeader, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<Icon name="cart" size={15} color="#fff" strokeWidth={2} />
			</div>
			{children}
		</div>
		<div style={{fontSize: 16, fontWeight: 700, color: colors.textDark, marginTop: 10}}>{name}</div>
		<div style={{display: 'flex', alignItems: 'baseline', gap: 7, marginTop: 4}}>
			<span style={{fontSize: 17, fontWeight: 800, color: colors.textDark}}>{price}</span>
			<span style={{fontSize: 12.5, color: colors.textLight, textDecoration: 'line-through'}}>{old}</span>
		</div>
		<div style={{fontSize: 12.5, color: colors.textGray, marginTop: 4}}>{shop}</div>
		<div style={{marginTop: 7}}>
			<Stars n={stars} count={count} />
		</div>
	</div>
);

export const HomeScreen: React.FC = () => {
	return (
		<AbsoluteFill style={{background: colors.screenBg, fontFamily, color: colors.textDark}}>
			<StatusBar />
			<div style={{padding: '6px 22px 0'}}>
				{/* greeting */}
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
					<div>
						<div style={{fontSize: 25, fontWeight: 800}}>Bonjour, Amani</div>
						<div style={{fontSize: 15, color: colors.textGray, marginTop: 3}}>Que cherchez-vous ?</div>
					</div>
					<div style={{width: 46, height: 46, borderRadius: '50%', background: colors.navyHeader, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						<Icon name="chat" size={22} color="#fff" strokeWidth={1.9} />
					</div>
				</div>

				{/* search */}
				<div
					style={{
						marginTop: 18,
						height: 52,
						background: '#fff',
						borderRadius: 26,
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						padding: '0 20px',
						boxShadow: '0 6px 16px rgba(20,30,60,0.05)',
					}}
				>
					<Icon name="search" size={21} color={colors.textGray} />
					<span style={{fontSize: 15.5, color: colors.textLight}}>Rechercher produits, boutiques...</span>
				</div>

				{/* categories header */}
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22}}>
					<span style={{fontSize: 20, fontWeight: 800}}>Categories</span>
					<span style={{fontSize: 14, color: colors.orange, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2}}>
						Voir tout <Icon name="chevron" size={15} color={colors.orange} strokeWidth={2.2} />
					</span>
				</div>

				{/* chips */}
				<div style={{display: 'flex', gap: 10, marginTop: 14, overflow: 'hidden'}}>
					<div style={{display: 'flex', alignItems: 'center', gap: 7, background: colors.navyHeader, color: '#fff', padding: '11px 20px', borderRadius: 22, fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap'}}>
						<Icon name="sparkle" size={16} color="#fff" fill strokeWidth={1.2} /> Tout
					</div>
					<div style={{display: 'flex', alignItems: 'center', gap: 7, background: '#fff', color: '#3a4150', padding: '11px 18px', borderRadius: 22, fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap', border: `1px solid ${colors.line}`}}>
						<Icon name="tag" size={16} color={colors.textGray} /> Mode &amp; Vetements
					</div>
					<div style={{display: 'flex', alignItems: 'center', gap: 7, background: '#fff', color: '#3a4150', padding: '11px 18px', borderRadius: 22, fontSize: 14.5, fontWeight: 600, whiteSpace: 'nowrap', border: `1px solid ${colors.line}`}}>
						<Icon name="tag" size={16} color={colors.textGray} /> Electron
					</div>
				</div>

				{/* category cards */}
				<div style={{display: 'flex', gap: 14, marginTop: 16}}>
					<CategoryCard label="Boutiques" bg={colors.tintBlue} icon="store" color={colors.navyHeader} />
					<CategoryCard label="Restaurants" bg={colors.tintOrange} icon="utensils" color={colors.orange} />
					<CategoryCard label="Salons" bg={colors.tintPink} icon="scissors" color="#D6336C" />
				</div>

				{/* populaires header */}
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24}}>
					<span style={{fontSize: 20, fontWeight: 800}}>Populaires</span>
					<span style={{fontSize: 14, color: colors.orange, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 2}}>
						Voir tout <Icon name="chevron" size={15} color={colors.orange} strokeWidth={2.2} />
					</span>
				</div>

				{/* product cards */}
				<div style={{display: 'flex', gap: 14, marginTop: 14}}>
					<ProductCard name="iPhone 17" price="$900.00" old="$950.00" badge="-5%" shop="Kwetu Pazuri" stars={4} count={4}>
						{/* phone silhouette */}
						<div style={{width: 78, height: 120, borderRadius: 16, background: 'linear-gradient(160deg,#3a3f4a,#1c1f26)', position: 'relative', boxShadow: '0 6px 14px rgba(0,0,0,0.25)'}}>
							<div style={{position: 'absolute', top: 9, left: 9, width: 30, height: 30, borderRadius: 9, background: '#2a2e37', border: '2px solid #44495400'}}>
								<div style={{position: 'absolute', top: 5, left: 5, width: 9, height: 9, borderRadius: '50%', background: '#0c0d10'}} />
								<div style={{position: 'absolute', bottom: 5, right: 5, width: 9, height: 9, borderRadius: '50%', background: '#0c0d10'}} />
							</div>
						</div>
					</ProductCard>
					<ProductCard name="Chargeur" price="12 500 FC" old="15 000 FC" badge="-17%" shop="Kwetu Pazuri" stars={3} count={1}>
						<div style={{display: 'flex', gap: 6}}>
							{[0, 1].map((i) => (
								<div key={i} style={{width: 46, height: 56, borderRadius: 9, background: '#fff', border: '1px solid #E2E4E9', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', position: 'relative'}}>
									<div style={{position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 18, height: 11, borderRadius: 2, background: '#EDEFF2', border: '1px solid #DfE1E6'}} />
								</div>
							))}
						</div>
					</ProductCard>
				</div>
			</div>

			{/* bottom nav */}
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: 86,
					background: '#fff',
					borderTop: `1px solid ${colors.line}`,
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'flex-start',
					paddingTop: 12,
				}}
			>
				{[
					{n: 'Accueil', i: 'home', a: true},
					{n: 'Boutiques', i: 'store', a: false},
					{n: 'Services', i: 'wrench', a: false},
					{n: 'Panier', i: 'cart', a: false},
					{n: 'Profil', i: 'user', a: false},
				].map((t) => (
					<div key={t.n} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5}}>
						<Icon name={t.i as React.ComponentProps<typeof Icon>['name']} size={24} color={t.a ? colors.navyHeader : colors.textLight} strokeWidth={t.a ? 2.1 : 1.8} />
						<span style={{fontSize: 11.5, fontWeight: t.a ? 700 : 500, color: t.a ? colors.navyHeader : colors.textLight}}>{t.n}</span>
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
};
