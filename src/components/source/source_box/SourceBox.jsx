import React from 'react';
import styles from './SourceBox.module.scss';

export const SourceBox = ({ title, description, url, publisher, imageUrl }) => {
	return (
		<div className={styles.sourceBox}>
			<div>
				{ imageUrl && (
					<div>
						<img className={styles.sourceBoxImage} src={imageUrl} height={200} width={280} alt={`${title}`}  />
					</div>
				)}
			</div>
			<div className={styles.sourceBoxBody}>
				<div className={styles.sourceBoxPublisher}>
					{ publisher }
				</div>
				<div className={styles.sourceBoxTitle} title={ title }>
					<a className={styles.sourceLink} href={ url } target="_blank" rel="nofollow noopener noreferrer">
						{ title }
					</a>
				</div>
				<div className={styles.sourceBoxDescription}>
					{ description }
				</div>
			</div>
		</div>
	);
}