import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useContext, useRef, useState } from 'react';
import { FormIsOpenedContext } from 'src/contexts/FormIsOpenedContext';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Spacing } from '../spacing';
import { PageStateType } from 'src/index';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { useEnterSubmit } from '../select/hooks/useEnterSubmit';


type ArticleFormProps = {
	setPageState: React.Dispatch<React.SetStateAction<PageStateType>>;
}

export const ArticleParamsForm = ({setPageState}: ArticleFormProps) => {
	const formRef = useRef<HTMLDivElement>(null);

	const formData = useContext(FormIsOpenedContext);

	const [selectedFont, setSelectedFont] = useState<OptionType>(fontFamilyOptions[0]);

	const [selectedSizeFont, setSelectedSizeFont] = useState<OptionType>(fontSizeOptions[0]);
	
	const [selectedColorFont, setSelectedColorFont] = useState<OptionType>(fontColors[0]);
	
	const [selectedColorBackgound, setSelectedColorBackgound] = useState<OptionType>(backgroundColors[0]);

	const [selectedWidthContent, setSelectedWidthContent] = useState<OptionType>(contentWidthArr[0]);

	const handleSubmit = (evt: React.SyntheticEvent) => {
		evt.preventDefault();

		setPageState({
			fontFamilyOption: selectedFont,
			fontColor: selectedColorFont,
			backgroundColor: selectedColorBackgound,
			contentWidth: selectedWidthContent,
			fontSizeOption: selectedSizeFont,
		});
	};

	const handleReset = (evt: React.SyntheticEvent) => {
		evt.preventDefault();

		setPageState(defaultArticleState);

		setSelectedFont(fontFamilyOptions[0])
		setSelectedSizeFont(fontSizeOptions[0])
		setSelectedColorFont(fontColors[0])
		setSelectedColorBackgound(backgroundColors[0])
		setSelectedWidthContent(contentWidthArr[0])
	}

	useOutsideClickClose({
		isOpen: formData.isOpened,
		onChange: formData.toggleIsOpened as (newValue: boolean) => void,
		rootRef: formRef,
		onClose: () => {
			console.log('Форма закрыта кликом вне её');
			console.log(formData.isOpened)
		},
	});

	useEnterSubmit({
		onChange: formData.toggleIsOpened as (isOpen: boolean) => void,
		placeholderRef: formRef,
	});

	return (
		<>
			<ArrowButton />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: formData.isOpened,
				})} ref={formRef}>
				<form className={styles.form}>

					<Select 
						title='шрифт'
						options={fontFamilyOptions}
						selected={selectedFont}
						onChange={setSelectedFont}
						placeholder=''
					></Select>

					<Spacing size={50}/>

					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={selectedSizeFont}
						onChange={setSelectedSizeFont}
						title='размер шрифта'
					>
					</RadioGroup>

					<Spacing size={50}/>

					<Select 
						title='цвет шрифта'
						options={fontColors}
						selected={selectedColorFont}
						onChange={setSelectedColorFont}
						placeholder=''
					></Select>

					<Spacing size={50}/>

					<Separator></Separator>

					<Spacing size={50}/>

					<Select 
						title='цвет фона'
						options={backgroundColors}
						selected={selectedColorBackgound}
						onChange={setSelectedColorBackgound}
						placeholder=''
					></Select>

					<Spacing size={50}/>

					<Select 
						title='ширина контента'
						options={contentWidthArr}
						selected={selectedWidthContent}
						onChange={setSelectedWidthContent}
						placeholder=''
					></Select>

					<Spacing size={50}/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={handleReset}
						/>
						<Button title='Применить' type='submit' onClick={handleSubmit} />
					</div>
				</form>
			</aside>
		</>
	);
};
