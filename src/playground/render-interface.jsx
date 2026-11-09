/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {FormattedMessage, defineMessages, injectIntl, intlShape} from 'react-intl';
import {getIsLoading} from '../reducers/project-state.js';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import TWProjectMetaFetcherHOC from '../lib/tw-project-meta-fetcher-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';
import SBFileUploaderHOC from '../lib/sb-file-uploader-hoc.jsx';
import TWPackagerIntegrationHOC from '../lib/tw-packager-integration-hoc.jsx';
import SettingsStore from '../addons/settings-store-singleton';
import '../lib/tw-fix-history-api';
import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import ProjectInput from '../components/tw-project-input/project-input.jsx';
//import FeaturedProjects from '../components/tw-featured-projects/featured-projects.jsx';
import Description from '../components/tw-description/description.jsx';
import BrowserModal from '../components/browser-modal/browser-modal.jsx';
import {openEditorSettingsModal} from '../reducers/modals';
import CloudVariableBadge from '../containers/tw-cloud-variable-badge.jsx';
import TWWindchimeSubmitter from '../containers/tw-windchime-submitter.jsx';
import {isBrowserSupported} from '../lib/tw-environment-support-prober';
import AddonChannels from '../addons/channels';
import {loadServiceWorker} from './load-service-worker';
import runAddons from '../addons/entry';
import InvalidEmbed from '../components/tw-invalid-embed/invalid-embed.jsx';
import {APP_NAME} from '../lib/brand.js';

import styles from './interface.css';

const isInvalidEmbed = window.parent !== window;

const handleClickAddonSettings = addonId => {
    // addonId might be a string of the addon to focus on, undefined, or an event (treat like undefined)
    const path = process.env.ROUTING_STYLE === 'wildcard' ? 'addons' : 'addons.html';
    const url = `${process.env.ROOT}${path}${typeof addonId === 'string' ? `#${addonId}` : ''}`;
    window.open(url);
};

const handleClickEditorSettings = () => {
    try{
        openEditorSettingsModal();
    }catch(e){
        window.alert(e);
    }
};

const messages = defineMessages({
    defaultTitle: {
        defaultMessage: 'Make your Scratch projects more powerful!',
        description: 'Title of homepage',
        id: 'tw.guiDefaultTitle'
    }
});

const WrappedMenuBar = compose(
    SBFileUploaderHOC,
    TWPackagerIntegrationHOC
)(MenuBar);

if (AddonChannels.reloadChannel) {
    AddonChannels.reloadChannel.addEventListener('message', () => {
        location.reload();
    });
}

if (AddonChannels.changeChannel) {
    AddonChannels.changeChannel.addEventListener('message', e => {
        SettingsStore.setStoreWithVersionCheck(e.data);
    });
}

runAddons();

const Footer = () => (
    <footer className={styles.footer}>
        <div className={styles.footerContent}>
            <div className={styles.footerText}>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="TurboWarp and {APP_NAME} are not affiliated with Scratch, the Scratch Team, or the Scratch Foundation. (We're saying mostly everything is fan-made)"
                    description="Disclaimer that the Scratch Mods are not connected to Scratch"
                    id="gm2.footer.disclaimer"
                    values={{
                        APP_NAME
                    }}
                />
            </div>

            <div className={styles.footerText}>
                <FormattedMessage
                    // eslint-disable-next-line max-len
                    defaultMessage="Scratch is a project of the Scratch Foundation. It is available for free at {scratchDotOrg}."
                    description="A disclaimer that Scratch requires when referring to Scratch. {scratchDotOrg} is a link with text 'https://scratch.mit.edu/'"
                    id="tw.footer.scratchDisclaimer"
                    values={{
                        scratchDotOrg: (
                            <a
                                href="https://scratch.mit.edu/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {'https://scratch.mit.edu/'}
                            </a>
                        )
                    }}
                />
            </div>

            <div className={styles.footerColumns}>
                <div className={styles.footerSection}>
                    <a href="credits.html">
                        <FormattedMessage
                            defaultMessage="Credits"
                            description="Credits link in footer"
                            id="tw.footer.credits"
                        />
                    </a>
                </div>
                <div className={styles.footerSection}>
                    <a href="https://gvbvdxx.me/">
                        {/* Do not translate */}
                        {"Gvbvdxx's other amazing programs & software!"}
                    </a>
                    <a href="https://github.com/gvbvdxxmod2/scratch-gui/issues">
                        <FormattedMessage
                            defaultMessage="Issues, Feedback and Bug reports"
                            description="Link to feedback/bugs page"
                            id="gm2.feedback"
                        />
                    </a>
                    <a href="https://github.com/gvbvdxxmod2">
                        <FormattedMessage
                            defaultMessage="Source Code"
                            description="Link to source code"
                            id="gm2.code"
                        />
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

class Interface extends React.Component {
    constructor (props) {
        super(props);
        this.handleUpdateProjectTitle = this.handleUpdateProjectTitle.bind(this);
    }
    componentDidUpdate (prevProps) {
        if (prevProps.isLoading && !this.props.isLoading) {
            loadServiceWorker();
        }
    }
    handleUpdateProjectTitle (title, isDefault) {
        if (isDefault || !title) {
            document.title = `${APP_NAME} - ${this.props.intl.formatMessage(messages.defaultTitle)}`;
        } else {
            document.title = `${title} - ${APP_NAME}`;
        }
    }
    render () {
        if (isInvalidEmbed) {
            return <InvalidEmbed />;
        }

        const {
            /* eslint-disable no-unused-vars */
            intl,
            hasCloudVariables,
            description,
            isFullScreen,
            isLoading,
            isPlayerOnly,
            isRtl,
            projectId,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        const isHomepage = isPlayerOnly && !isFullScreen;
        const isEditor = !isPlayerOnly;
        return (
            <div
                className={classNames(styles.container, {
                    [styles.playerOnly]: isHomepage,
                    [styles.editor]: isEditor
                })}
                dir={isRtl ? 'rtl' : 'ltr'}
            >
                <TWWindchimeSubmitter />
                {isHomepage ? (
                    <div className={styles.menu}>
                        <WrappedMenuBar
                            canChangeLanguage
                            canManageFiles
                            canChangeTheme
                            enableSeeInside
                            onClickAddonSettings={handleClickAddonSettings}
                            onClickEditorSettings={handleClickEditorSettings}
                        />
                    </div>
                ) : null}
                <div
                    className={styles.center}
                    style={isPlayerOnly ? ({
                        // + 2 accounts for 1px border on each side of the stage
                        width: `${Math.max(480, props.customStageSize.width) + 2}px`
                    }) : null}
                >
                    <GUI
                        onClickAddonSettings={handleClickAddonSettings}
                        onUpdateProjectTitle={this.handleUpdateProjectTitle}
                        backpackVisible
                        backpackHost="_local_"
                        {...props}
                    />
                    {isHomepage ? (
                        <React.Fragment>
                            {isBrowserSupported() ? null : (
                                <BrowserModal isRtl={isRtl} />
                            )}
                            <div className={styles.section}>
                                <ProjectInput />
                            </div>
                            {hasCloudVariables && projectId !== '0' && (
                                <div className={styles.section}>
                                    <CloudVariableBadge />
                                </div>
                            )}
                            {description.instructions || description.credits ? (
                                <div className={styles.section}>
                                    <Description
                                        instructions={description.instructions}
                                        credits={description.credits}
                                        projectId={projectId}
                                    />
                                </div>
                            ) : null}
                            <div className={styles.section}>
                                <p>
                                    <FormattedMessage
                                        // eslint-disable-next-line max-len
                                        defaultMessage="{APP_NAME} is a tool for making programs in your browser by connecting lego-like blocks toghether (also known as block-coding and block-based-coding). {APP_NAME} is a modification of {TW_LINK}'s code, which in turn is a modification of {SCRATCH_LINK}'s code. {APP_NAME} aims for more power and control over what you can make with it, compared to {SCRATCH_LINK}. Additionally since {APP_NAME} is based on {TW_LINK}'s code, it also inherits its super fast compiler, making it easier to make larger programs for slower devices compared to raw {SCRATCH_LINK}."
                                        description="Description of TurboWarp on the homepage"
                                        id="tw.home.description"
                                        values={{
                                            APP_NAME,
                                            TW_LINK: (
                                                <a
                                                    href="https://turbowarp.org/"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {'TurboWarp'}
                                                </a>
                                            ),
                                            SCRATCH_LINK: (
                                                <a
                                                    href="https://scratch.mit.edu/"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {'Scratch'}
                                                </a>
                                            )
                                        }}
                                    />
                                </p>
                            </div>
                            <div className={styles.section}>
                                {/*<FeaturedProjects studio="27205657" />*/}
                            </div>
                        </React.Fragment>
                    ) : null}
                </div>
                {isHomepage && <Footer />}
            </div>
        );
    }
}

Interface.propTypes = {
    intl: intlShape,
    hasCloudVariables: PropTypes.bool,
    customStageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    description: PropTypes.shape({
        credits: PropTypes.string,
        instructions: PropTypes.string
    }),
    isFullScreen: PropTypes.bool,
    isLoading: PropTypes.bool,
    isPlayerOnly: PropTypes.bool,
    isRtl: PropTypes.bool,
    projectId: PropTypes.string
};

const mapStateToProps = state => ({
    hasCloudVariables: state.scratchGui.tw.hasCloudVariables,
    customStageSize: state.scratchGui.customStageSize,
    description: state.scratchGui.tw.description,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isLoading: getIsLoading(state.scratchGui.projectState.loadingState),
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    projectId: state.scratchGui.projectState.projectId
});

const mapDispatchToProps = () => ({});

const ConnectedInterface = injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface));

const WrappedInterface = compose(
    AppStateHOC,
    ErrorBoundaryHOC('TW Interface'),
    TWProjectMetaFetcherHOC,
    TWStateManagerHOC,
    TWPackagerIntegrationHOC
)(ConnectedInterface);

export default WrappedInterface;
