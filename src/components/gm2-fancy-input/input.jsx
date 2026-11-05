import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.css';
import classNames from 'classnames';

function numberRender(props) {
    var defaultVal = props.value || 0;
    return (<input
        type="number"
        defaultValue={defaultVal}
        className={classNames(props.className, styles.numberInput)}
        onBlur={
            (e) => {
                props.onChange(e);
            }
        }
    />);
}

function render(props) {
    if (props.inputType == "number") {
        return numberRender(props);
    }
}

const FancyInput = render;

FancyInput.propTypes = {
    className: PropTypes.string,
    inputType: PropTypes.string,
};

export default FancyInput;
