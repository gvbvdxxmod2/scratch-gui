import React from 'react';
import PropTypes from 'prop-types';
import render from '../app-target';
import styles from './credits.css';

import {APP_NAME} from '../../lib/brand';
import {applyGuiColors} from '../../lib/themes/guiHelpers';
import {detectTheme} from '../../lib/themes/themePersistance';
import UserData from './users';
import GM2UserData from './gm2-users.jsx';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const User = ({image, text, href}) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={styles.user}
    >
        <img
            loading="lazy"
            className={styles.userImage}
            src={image}
            width="60"
            height="60"
        />
        <div className={styles.userInfo}>
            {text}
        </div>
    </a>
);
User.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string
};

const UserList = ({users}) => (
    <div className={styles.users}>
        {users.map((data, index) => (
            <User
                key={index}
                {...data}
            />
        ))}
    </div>
);
UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

const Credits = () => (
    <main className={styles.main}>
        <header className={styles.headerContainer}>
            <h1 className={styles.headerText}>
                {APP_NAME} Credits
            </h1>
        </header>
        <section>
            <p>
                {APP_NAME} is made possible thanks to TurboWarp and Scratch being free & open source!
            </p>
        </section>
        {APP_NAME !== 'Gvbvdxx Mod 2' && (
            // Be kind and considerate. Don't remove this :)
            <section>
                <h2>Gvbvdxx Mod 2</h2>
                <p>
                    {APP_NAME} is based on <a href="https://github.com/gvbvdxxmod2/">Gvbvdxx Mod 2</a>'s source code.
                </p>
            </section>
        )}
        <section>
            <h2>Developers, contributors, and helping people</h2>
            <UserList users={GM2UserData.people} />
        </section>
        <header className={styles.headerContainer}>
            <h1 className={styles.headerText}>
                TurboWarp Credits
            </h1>
        </header>
        <section>
            <p>
                The TurboWarp project is made possible by the work of many volunteers.
            </p>
        </section>
        {APP_NAME !== 'TurboWarp' && (
            // Be kind and considerate. Don't remove this :)
            <section>
                <h2>TurboWarp</h2>
                <p>
                    {APP_NAME} is based on <a href="https://turbowarp.org/">TurboWarp</a>'s source code, found <a href="https://github.com/TurboWarp/">here</a>.
                </p>
            </section>
        )}
        <section>
            <h2>Scratch</h2>
            <p>
                TurboWarp is based on the work of the <a href="https://scratch.mit.edu/credits">Scratch contributors</a> but is not endorsed by Scratch in any way.
            </p>
            <p>
                <a href="https://scratch.mit.edu/donate">
                    Donate to support Scratch.
                </a>
            </p>
        </section>
        <section>
            <h2>Contributors</h2>
            <UserList users={UserData.contributors} />
        </section>
        <section>
            <h2>Addons</h2>
            <UserList users={UserData.addonDevelopers} />
        </section>
        <section>
            <h2>TurboWarp Extension Gallery</h2>
            <UserList users={UserData.extensionDevelopers} />
        </section>
        <section>
            <h2>Documentation</h2>
            <UserList users={UserData.docs} />
        </section>
        <section>
            <h2>Translators</h2>
            <p>
                More than 100 people have helped translate TurboWarp and its addons into many languages
                &mdash; far more than we could hope to list here.
            </p>
        </section>
        <section>
            <p>
                <i>
                    Individual contributors are listed in no particular order.
                    The order is randomized each visit.
                </i>
            </p>
        </section>
    </main>
);

render(<Credits />);
