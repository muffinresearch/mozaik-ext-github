import React, { Component, PropTypes } from 'react';


class Count extends Component {
    render() {
        const { count, warnLimit } = this.props;
        let classes = "github__count";
        if (warnLimit && parseInt(count, 10) >= parseInt(warnLimit, 10)) {
            classes += ' warn';
        }
        return (
            <div className={ classes }>
                <span>{ count }</span>
            </div>
        );
    }
}

Count.displayName = 'Count';

Count.propTypes = {
    count: PropTypes.string.isRequired
};

export default Count;
