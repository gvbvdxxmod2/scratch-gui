import {defineMessages, FormattedMessage, intlShape, injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import classNames from 'classnames';

import styles from './editor-options.css';
import isScratchDesktop from '../../lib/isScratchDesktop.js';

const messages = defineMessages({
    title: {
        defaultMessage: 'Editor Options',
        description: 'Title of the Editor Options modal',
        id: 'gm2.editorOptions.title'
    }
});

const EditorOptionsComponent = props => (
    <Modal
        className={styles.modalContent}
        onRequestClose={props.onCancel}
        contentLabel={props.intl.formatMessage(messages.title)}
        id="editorOptions"
    >
        <Box className={styles.body}>
            
        </Box>
    </Modal>
);

EditorOptionsComponent.propTypes = {
    intl: intlShape,
    onCancel: PropTypes.func.isRequired,
};

export default injectIntl(EditorOptionsComponent);
