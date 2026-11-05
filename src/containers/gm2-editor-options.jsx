import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {defineMessages, injectIntl, intlShape} from 'react-intl';
import {openEditorSettingsModal} from '../reducers/modals';
import {closeEditMenu} from '../reducers/menus';
import isScratchDesktop from '../lib/isScratchDesktop';

const messages = defineMessages({

});

class GM2EditorOptions extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'doEditorOptions'
        ]);
    }
    doEditorOptions () {
        //if (this.props.running && !isScratchDesktop()) {
        //    // eslint-disable-next-line no-alert
        //    //alert(this.props.intl.formatMessage(messages.cannotChangeWhileRunning));
        //    return;
        //}
        this.props.onOpenEditorOptions();
    }
    render () {
        return this.props.children(this.doEditorOptions);
    }
}

GM2EditorOptions.propTypes = {
    children: PropTypes.func,
    doEditorOptions: PropTypes.func,
    //running: PropTypes.bool,
    intl: intlShape
};

const mapStateToProps = state => ({
    //running: state.scratchGui.vmStatus.running
});

const mapDispatchToProps = dispatch => ({
    onOpenEditorOptions: () => {
        dispatch(openEditorSettingsModal());
        dispatch(closeEditMenu());
    }
});

export default injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(GM2EditorOptions));
