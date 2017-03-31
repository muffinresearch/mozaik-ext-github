import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetStatusBadge,
} from 'mozaik/ui'


export default class Status extends Component {
    static propTypes = {
        term: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        warnLimit: PropTypes.number,
        apiData: PropTypes.shape({
            totalCount: PropTypes.string.isRequired,
        })
    }

    static getApiRequest() {
        let { term } = this.props;
        return {
            id: `github.counts.${ term }`,
            params: {
                term: term
            }
        };
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { apiData, apiError } = this.props
        const { theme } = this.context

        countContainerStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }

        spanStyle = {
            background: theme.colors.success,
            borderRadius: '50%',
            color: '#fff',
            display: 'table-cell',
            fontSize: '7rem',
            height: '13rem',
            lineHeight: '13rem',
            margin: '1rem',
            textAlign: 'center',
            verticalAlign: 'middle',
            width: '13rem',
        }

        const countWidget = (
          <div style={countContainerStyle}>
              <span style={spanStyle}>{ apiData.totalCount }</span>
          </div>
        )

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
