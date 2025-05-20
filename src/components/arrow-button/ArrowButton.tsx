import { useContext, useState } from 'react';
import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { FormIsOpenedContext, FormIsOpenedContextValue } from 'src/contexts/FormIsOpenedContext';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = () => {

	const formData = useContext(FormIsOpenedContext);

	const handleArrowButton = () => {
		if (formData.toggleIsOpened) {
			formData.toggleIsOpened(!formData.isOpened);
		}
	};


	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: formData.isOpened,
			})}
			onClick={handleArrowButton}
		>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: formData.isOpened,
				})}
			/>
		</div>

	);
};
