import React from 'react';
import {FormattedMessage} from 'react-intl';

import {APP_NAME} from '../../brand';

import jsDialogsBigIcon from './dialog/dialogs.png';
import jsDialogsSmallIcon from './dialog/small.png';
import speech4pcDialogsBigIcon from './speech4pc/speech.png';
import speech4pcDialogsSmallIcon from './speech4pc/small.png';
import websitesBigIcon from './websites/websites.png';
import websitesSmallIcon from './websites/small.png';
import betteraudioBigIcon from './better_audio/big.png';
import betteraudioSmallIcon from './better_audio/small.png';
import gamepadbig from './gamepad/gamepads-thumbnail.svg';
import gamepadsmall from './gamepad/small.png';
import webmidismall from './webmidi/small.png';
import webmidibig from './webmidi/big.png';
import beepboxsmall from './beepbox_synth/small.png';
import beepboxbig from './beepbox_synth/big.png';
import wsbig from './websockets/websockets-thumbnail.svg';
import audioctxsmall from './audio_context/small.png';
import audioctxbig from './audio_context/big.png';
import userdatasmall from './userdata/small.png';
import userdatabig from './userdata/big.png';
import rokusmall from './roku/small.png';
import rokubig from './roku/big.png';

import sprcanvas from './sprite_canvas/sprite_canvas.svg';

import sndanalyserBig from './sound_analyser/big.svg';

import nessmall from './nes_emulator/nes-small.svg';
import nesbig from './nes_emulator/nes.svg';

import gm2HTML5Small from './html5/small.svg';
import gm2HTML5Large from './html5/html5-thumbnail.svg';

export default [
    {
        incompatibleWithScratch: true,
        name: (
            <FormattedMessage
                defaultMessage="Sprite Canvases"
                description="Name for the extension for drawing on Sprites."
                id="gm2.extensions.spritecanvas.name"
            />
        ),
            extensionId: 'spritecanvas',
            iconURL: sprcanvas,
            description: (
                <FormattedMessage
                    defaultMessage="Draw on sprites, not just the stage. Additionally lets you export the drawings as PNGs as well."
                    description="A breif description for the Sprite Canvases extension."
                    id="gm2.extensions.spritecanvas.description"
                />
            ),
            featured: true,
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: (
                <FormattedMessage
                    defaultMessage="NES Emulation"
                    description="Name for the extension for emulating NES games."
                    id="gm2.extensions.nesemulator.name"
                />
            ),
            extensionId: 'nesemulator',
            insetIconURL: null,
            iconURL: nesbig,
            description: (
                <FormattedMessage
                    defaultMessage="Run Nintendo Entertainment System games and control them through your projects code."
                    description="A breif description for the NES Emulation extension."
                    id="gm2.extensions.nes.description"
                />
            ),
            featured: true,
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: (
                <FormattedMessage
                    defaultMessage="Sound Analyser"
                    description="Name for the extension for reading current audio information."
                    id="gm2.extensions.sndanalyser.name"
                />
            ),
            extensionId: 'sndanalyser',
            iconURL: sndanalyserBig,
            description: (
                <FormattedMessage
                    defaultMessage="Read the information about audio playing from the project."
                    description="A breif description for the Sound Analyser extension."
                    id="gm2.extensions.sndanalyser.description"
                />
            ),
            featured: true,
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: (
                <FormattedMessage
                    defaultMessage="HTML5 Elements"
                    description="Name for the HTML5 Elements extension."
                    id="gm2.extensions.html5.name"
                />
            ),
            extensionId: 'html5',
            insetIconURL: null,
            iconURL: gm2HTML5Large,
            description: (
                <FormattedMessage
                    defaultMessage="Create HTML elements outside the stage. Fun & useful as an effect for making things look like they have escaped the stage."
                    description="A breif description for the Sprite Canvases extension."
                    id="gm2.extensions.html5.description"
                />
            ),
            featured: true,
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: (
                <FormattedMessage
                    defaultMessage="Roku Controls"
                    description="Name for the Roku Controls extension."
                    id="gm2.extensions.roku.name"
                />
            ),
            extensionId: 'roku',
            iconURL: rokubig,
            insetIconURL: rokusmall,
            description: (
                <FormattedMessage
                    defaultMessage="Control your Roku devices using code from your project, requires special {appname} software installed."
                    description="A breif description for the Roku Controls extension."
                    id="gm2.extensions.roku.description"
                    values={{
                        appname: APP_NAME
                    }}
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: true,
            bluetoothRequired: false,
            helpLink: '',
            softwareRequired: true,
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: (
                <FormattedMessage
                    defaultMessage="User Information"
                    description="Name for the User Information extension."
                    id="gm2.extensions.userdata.name"
                />
            ),
            extensionId: 'userdata',
            iconURL: userdatabig,
            insetIconURL: userdatasmall,
            description: (
                <FormattedMessage
                    defaultMessage="Retrieve the user's network information in your code easily."
                    description="A breif description for the User Information extension."
                    id="gm2.extensions.userdata.description"
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: '',
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: (
                <FormattedMessage
                    defaultMessage="Audio Context blocks"
                    description="Name for the Audio Context blocks extension."
                    id="gm2.extensions.audioctx.name"
                />
            ),
            extensionId: 'audioctx',
            iconURL: audioctxbig,
            insetIconURL: audioctxsmall,
            description: (
                <FormattedMessage
                    defaultMessage="Play 8-bit sounds"
                    description="A breif description for the Audio Context blocks extension."
                    id="gm2.extensions.audioctx.description"
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: '',
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: (
                <FormattedMessage
                    defaultMessage="Gvbvdxx Mod Websockets"
                    description="Name for the Gvbvdxx Mod Websockets extension."
                    id="gm2.extensions.websocket.name"
                />
            ),
            extensionId: 'websocket',
            iconURL: wsbig,
            insetIconURL: null,
            description: (
                <FormattedMessage
                    defaultMessage="Enables you to connect to an server built for Gvbvdxx Mod, though this is (somewhat) deprecated and shouldn't be used anymore."
                    description="A breif description for the Gvbvdxx Mod Websockets extension."
                    id="gm2.extensions.websocket.description"
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: '',
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: 'Beepbox',
            extensionId: 'beepboxsynth',
            iconURL: beepboxbig,
            insetIconURL: beepboxsmall,
            description: (
                <FormattedMessage
                    defaultMessage="Play {beepboxlink} songs without exporting them."
                    description="A breif description for the Beepbox extension."
                    id="gm2.extensions.beepboxsynth.description"
                    values={{
                        beepboxlink:
                        (
                            <a href="https://beepbox.co/" target="_blank" onClick={(e) => e.stopPropagation()}>https://beepbox.co</a>
                        )
                    }}
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: '',
            tags: [
                "gm2"
            ]
        },
    {
        incompatibleWithScratch: true,
            name: (
                <FormattedMessage
                    defaultMessage="WebMIDI"
                    description="Name for the 'WebMIDI' extension"
                    id="gui.extension.webmidi.name"
                />
            ),
            extensionId: 'webmidi',
            iconURL: webmidibig,
            insetIconURL: webmidismall,
            description: (
                <FormattedMessage
                    defaultMessage="Web MIDI for Musical Instrument"
                    description="Description for the 'WebMIDI' extension"
                    id="gui.extension.webmidi.description"
                />
            ),
            featured: true,
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: 'Gamepads',
            extensionId: 'gamepad',
            iconURL: gamepadbig,
            insetIconURL: null,
            description: (
                <FormattedMessage
                    defaultMessage="Gamepad Support For Scratch"
                    description=""
                    id="gui.extension.gamepad.description"
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: '',
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: 'Better Audio',
            extensionId: 'betteraudio',
            iconURL: betteraudioBigIcon,
            insetIconURL: betteraudioSmallIcon,
            description: (
                <FormattedMessage
                    defaultMessage="Better Audio"
                    description="Better Audio For Scratch"
                    id="gui.extension.betteraudio.description"
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: '',
            tags: [
                "gm2"
            ]
        },
    /**    {
            name: 'Scratch Control',
            extensionId: 'scratch',
            collaborator: 'gvbvdxx',
            iconURL: scratchBigIcon,
            insetIconURL: scratchSmallIcon,
            description: (
                <FormattedMessage
                    defaultMessage="Scratch Control"
                    description="Control Scratch Stuff"
                    id="gui.extension.scratchcontrol.description"
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: ''
        },*/
        {
            incompatibleWithScratch: true,
            name: 'Website API',
            extensionId: 'websites',
            iconURL: websitesBigIcon,
            insetIconURL: websitesSmallIcon,
            description: (
                <FormattedMessage
                    defaultMessage="Website API"
                    description="Website API"
                    id="gui.extension.websites.description"
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: '',
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: 'JS',
            extensionId: 'dialogs',
            iconURL: jsDialogsBigIcon,
            insetIconURL: jsDialogsSmallIcon,
            description: (
                <FormattedMessage
                    defaultMessage="JS"
                    description="JS Blocks"
                    id="gui.extension.newblocks.description"
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: '',
            tags: [
                "gm2"
            ]
        },
        {
            incompatibleWithScratch: true,
            name: 'speech4pc',
            extensionId: 'speech4pc',
            iconURL: speech4pcDialogsBigIcon,
            insetIconURL: speech4pcDialogsSmallIcon,
            description: (
                <FormattedMessage
                    defaultMessage="Use your devices local text to speech service rather than Scratch's."
                    description="Use your devices local text to speech service rather than Scratch's."
                    id="gui.extension.speech4pc.description"
                />
            ),
            featured: true,
            disabled: false,
            internetConnectionRequired: false,
            bluetoothRequired: false,
            helpLink: '',
            tags: [
                "gm2"
            ]
        },
];