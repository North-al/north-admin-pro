export interface ContextMenuPosition {
    x: number
    y: number
    show: boolean
    clientX: number
    clientY: number
    pageX: number
    pageY: number
    screenX: number
    screenY: number
}

export interface UseContextMenuOptions {
    /**
     * 菜单的最小边距
     * @default 10
     */
    margin?: number

    /**
     * 菜单宽度（用于边界检测）
     * @default 200
     */
    menuWidth?: number

    /**
     * 菜单高度（用于边界检测）
     * @default 300
     */
    menuHeight?: number
}

/**
 * 右键菜单位置管理hooks
 * @param options 配置选项
 * @returns 菜单位置信息和相关方法
 */
export function useContextMenu(options: UseContextMenuOptions = {}) {
    const { margin = 10, menuWidth = 200, menuHeight = 300 } = options

    // 菜单位置状态
    const x = ref(0)
    const y = ref(0)
    const show = ref(false)
    const clientX = ref(0)
    const clientY = ref(0)
    const pageX = ref(0)
    const pageY = ref(0)
    const screenX = ref(0)
    const screenY = ref(0)

    // 计算菜单位置，确保不超出视窗边界
    const calculatePosition = (clientX: number, clientY: number) => {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        let posX = clientX
        let posY = clientY

        // 检查右边界
        if (posX + menuWidth + margin > windowWidth) {
            posX = windowWidth - menuWidth - margin
        }

        // 检查左边界
        if (posX < margin) {
            posX = margin
        }

        // 检查下边界
        if (posY + menuHeight + margin > windowHeight) {
            posY = windowHeight - menuHeight - margin
        }

        // 检查上边界
        if (posY < margin) {
            posY = margin
        }

        return { x: posX, y: posY }
    }

    // 显示菜单
    const showMenu = (event: MouseEvent | { clientX: number; clientY: number }) => {
        if ('preventDefault' in event) {
            event.preventDefault()
        }

        const { x: posX, y: posY } = calculatePosition(event.clientX, event.clientY)

        // 更新计算后的位置
        x.value = posX
        y.value = posY

        // 更新原始坐标信息
        clientX.value = event.clientX
        clientY.value = event.clientY

        // 如果是真实的鼠标事件，获取完整的坐标信息
        if ('pageX' in event) {
            pageX.value = event.pageX
            pageY.value = event.pageY
            screenX.value = event.screenX
            screenY.value = event.screenY
        } else {
            // 对于手动传入的坐标对象，使用clientX/Y作为默认值
            pageX.value = event.clientX
            pageY.value = event.clientY
            screenX.value = event.clientX
            screenY.value = event.clientY
        }

        show.value = true
    }

    // 隐藏菜单
    const hideMenu = () => {
        show.value = false
    }

    // 切换菜单显示状态
    const toggleMenu = (event: MouseEvent) => {
        if (show.value) {
            hideMenu()
        } else {
            showMenu(event)
        }
    }

    // 监听点击事件，点击其他地方时隐藏菜单
    const handleClickOutside = () => {
        if (show.value) {
            hideMenu()
        }
    }

    // 监听ESC键隐藏菜单
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && show.value) {
            hideMenu()
        }
    }

    onMounted(() => {
        document.addEventListener('click', handleClickOutside)
        document.addEventListener('keydown', handleKeydown)
        // 移除contextmenu事件监听，避免与右键菜单冲突
    })

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside)
        document.removeEventListener('keydown', handleKeydown)
    })

    return {
        // 位置和状态
        x,
        y,
        show,
        clientX,
        clientY,
        pageX,
        pageY,
        screenX,
        screenY,

        // 方法
        showMenu,
        hideMenu,
        toggleMenu,
        calculatePosition
    }
}
