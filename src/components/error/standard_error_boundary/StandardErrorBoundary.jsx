import React, { Component } from 'react';
import styles from './StandardErrorBoundary.module.scss';

export class StandardErrorBoundary extends Component {
    state = {
        error: null 
    }

    componentDidCatch(error) {
        this.setState({ error: error });
    }

    render() {
        if (this.state.error) {
            if(this.props.hideMessage) {
                return null;
            } else {
                return (
                    <div className={styles.errorContainer}>
                        { this.props.errorMessage || this.state.error.toString().replace("Error: ", "") }
                    </div>
                );
            }
        }
        return this.props.children;
    }
}