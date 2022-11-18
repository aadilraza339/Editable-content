/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const UsecaseListItem = ({
    item,
    isActive,
    isDisabled,
    hasCursor,
    onClickCallback,
    onFocusCallback,
    onDeactivateCallback,
}) => {
    const [focus, setFocus] = useState(hasCursor)
    const [active] = useState(isActive)
    const [disable] = useState(isDisabled)

    useEffect(() => {
        setFocus(hasCursor)
    }, [hasCursor])

    useEffect(() => {
        onFocusCallback(focus, item)
    }, [focus])

    return (
        <div
            data-testid="usecase-list-item"
            tabIndex="-1"
            className="UsecaseListItem"
            data-focus={focus}
            data-active={active}
            data-disable={disable}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            onClick={() => onClickCallback(item)}
            title={item?.description}
        >
            <img
                className="usecase-icon"
                src={`/assets/icons/usecase/${item?.icon}`}
                alt={item?.description}
            />
            <div className="text">{item?.name}</div>
        </div>
    )
}

UsecaseListItem.propTypes = {
    item: PropTypes.object.isRequired,
    hasCursor: PropTypes.bool,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClickCallback: PropTypes.func,
    onFocusCallback: PropTypes.func,
    onDeactivateCallback: PropTypes.func,
}

UsecaseListItem.defaultProps = {
    isActive: false,
    isDisabled: false,
    hasCursor: false,
    onClickCallback: () => {},
    onFocusCallback: () => {},
    onDeactivateCallback: () => {},
}

export default UsecaseListItem
