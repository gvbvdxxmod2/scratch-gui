import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';
import {connect} from 'react-redux';
import {setUsername, setUsernameInvalid} from '../reducers/tw';
import EditorOptionsModalComponent from '../components/gm2-editor-options/editor-options.jsx';
import {closeEditorSettingsModal} from '../reducers/modals';
import {generateRandomUsername} from '../lib/tw-username';
import isScratchDesktop from '../lib/isScratchDesktop';

class GM2EditorOptionsModal extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleCancel',
        ]);
        this.state = {
            
        };
    }
    handleCancel () {
        this.props.onCloseOptionsModal();
    }
    render () {
        return (
            <EditorOptionsModalComponent
                onCancel={this.handleCancel}
            />
        );
    }
}

GM2EditorOptionsModal.propTypes = {
    onCloseOptionsModal: PropTypes.func,
};

const mapStateToProps = state => ({
    //username: state.scratchGui.tw.username,
    //usernameInvalid: state.scratchGui.tw.usernameInvalid
});

const mapDispatchToProps = dispatch => ({
    onCloseOptionsModal: () => dispatch(closeEditorSettingsModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GM2EditorOptionsModal);
