import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { FormIsOpenedContext, FormIsOpenedContextValue } from './contexts/FormIsOpenedContext';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type PageStateType = typeof defaultArticleState;

const App = () => {

	const [pageState, setPageState] = useState<PageStateType>(defaultArticleState);

	const [isOpened, toggleIsOpened] = useState(false);

	const formIsOpenedValue: FormIsOpenedContextValue = {
			isOpened: isOpened,
			toggleIsOpened: toggleIsOpened
	};


	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<FormIsOpenedContext.Provider value={formIsOpenedValue}>
				<ArticleParamsForm setPageState={setPageState}/>
			</FormIsOpenedContext.Provider>
			
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
