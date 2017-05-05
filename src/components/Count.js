import React, { Component, PropTypes } from 'react'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


export default class Count extends Component {
    static propTypes = {
        term: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        totalCount: PropTypes.string.isRequired,
        warnLimit: PropTypes.number,
    }

    static getApiRequest({ term }) {
        return {
            id: `github.counts.${term}`,
            params: { term }
        };
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    getLink(content) {
        const { link } = this.props;
        const countContainerStyle = {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px',
        }

        if (link) {
            return (
             <a style={countContainerStyle} href={link} target="_blank" rel="noopener noreferrer">{content}</a>
            );
        } else {
            return (<div style={countContainerStyle}>{content}</div>);
        }
    }

    render() {
        const { apiData, apiError, title, warnLimit } = this.props
        const { theme } = this.context
        let backgroundColor = theme.colors.success;

        if (!apiData) {
            return null;
        }

        if (parseInt(apiData.totalCount, 10) >= parseInt(warnLimit, 10)) {
            backgroundColor = theme.colors.failure;
        }

        const svgStyle = {
          height: '100%',
        };

        const circleStyle = {
          fill: backgroundColor,
        };

        const textStyle = {
          fontSize: '4rem',
          fill: '#fff',
          fontFamily: 'sans-serif',
          textAnchor: 'middle',
        };

        const countWidget = this.getLink(<svg viewBox="0 0 140 140" preserveAspectRatio="xMinYMin meet" style={svgStyle}>
              <g>
                  <circle r="50%" cx="50%" cy="50%" class="circle-back" style={circleStyle} />
                  <text x="50%" y="50%" dy="0.3em" style={textStyle}>{apiData.totalCount}</text>
              </g>
          </svg>);

        return (
            <Widget>
                <WidgetHeader
                    title={title}
                    icon="github-alt"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                      { countWidget }
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
