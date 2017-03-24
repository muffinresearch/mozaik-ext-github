import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import Count                           from './Count.jsx';
import Mozaik                          from 'mozaik/browser';


class Counts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: null
        };
    }

    getApiRequest() {
        let { term } = this.props;

        return {
            id: `github.counts.${ term }`,
            params: {
                term: term
            }
        };
    }

    onApiData(data) {
        this.setState({
            count: data.total_count
        });
    }

    render() {
        let { term, title, warnLimit } = this.props;
        let { count }          = this.state;

        let titleNode = title === undefined ? (
            <span>
                <span className="widget__header__subject">{term}</span> count
            </span>
        ) : title;

        return (
            <div>
                <div className="widget__header">
                    {titleNode}
                    <i className="fa fa-github-alt" />
                </div>
                <div className="widget__body">
                    <Count count={count} warnLimit={warnLimit} />
                </div>
            </div>
        );
    }
}

Counts.propTypes = {
    term:       PropTypes.string.isRequired,
    title:      PropTypes.string
};

reactMixin(Counts.prototype, ListenerMixin);
reactMixin(Counts.prototype, Mozaik.Mixin.ApiConsumer);

export { Counts as default };
