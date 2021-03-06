import * as React from "react"
import Tree, { TreeProps } from "./Tree"
import TreeItem from "./TreeItem"
import styled from "../utils/styled"
import constants from "../utils/constants"

type Props = TreeProps["trees"][-1] & {
  searchWords?: string[]
  freeze?: boolean
  level: number
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const Container = styled.div<{ hasChildren: boolean; disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "inherit")};
  user-select: none;
`

const ChildTree: React.SFC<Props> = ({
  paddingLeft,
  paddingRight,
  initiallyOpen,
  highlight,
  tag,
  tagColor,
  label,
  icon,
  iconColor,
  disabled,
  forwardRef,
  childNodes = [],
  droppableProps,
  onClick,
  onContextMenu,
  cursor,
  searchWords,
  ignoreSearchWords,
  level,
  actions,
  onMouseEnter,
  onMouseLeave,
  strong,
  fontSize,
  fontColor,
  emphasized,
  monospace,
  freeze,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState(Boolean(initiallyOpen))
  const hasChildren = Boolean(childNodes && childNodes.length)

  const onNodeContextMenu = React.useMemo(
    () =>
      !disabled && onContextMenu
        ? (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()
            onContextMenu(event)
          }
        : undefined,
    [disabled, onContextMenu],
  )

  const onNodeClick =
    !disabled && (hasChildren || onClick)
      ? (e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation()
          if (e.altKey && onNodeContextMenu) {
            onNodeContextMenu(e)
            return
          }
          if (hasChildren && !freeze) {
            setIsOpen(!isOpen)
          }
          if (onClick) {
            onClick(e)
          }
        }
      : undefined

  return (
    <Container ref={forwardRef} disabled={Boolean(disabled)} hasChildren={hasChildren} {...props}>
      <TreeItem
        paddingLeft={paddingLeft ? paddingLeft : constants.space.small}
        paddingRight={paddingRight ? paddingRight : constants.space.small}
        level={level}
        searchWords={searchWords}
        freeze={freeze}
        ignoreSearchWords={ignoreSearchWords}
        onNodeClick={onNodeClick}
        onNodeContextMenu={onNodeContextMenu}
        highlight={Boolean(highlight)}
        hasChildren={hasChildren}
        isOpen={isOpen}
        tag={tag}
        tagColor={tagColor}
        label={label}
        icon={icon}
        iconColor={iconColor}
        disabled={disabled}
        actions={actions}
        cursor={cursor}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        strong={strong}
        fontSize={fontSize}
        fontColor={fontColor}
        emphasized={emphasized}
        monospace={monospace}
      />
      {hasChildren && isOpen && (
        <Tree
          _level={level + 1}
          paddingLeft={paddingLeft}
          paddingRight={paddingRight}
          trees={childNodes}
          searchWords={searchWords}
          freeze={freeze}
          droppableProps={droppableProps}
        />
      )}
    </Container>
  )
}

export default ChildTree
