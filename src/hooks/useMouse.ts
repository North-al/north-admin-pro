export interface MousePosition {
    x: number
    y: number
    clientX: number
    clientY: number
    pageX: number
    pageY: number
    screenX: number
    screenY: number
}

export interface UseMouseOptions {
    /**
     * 是否监听鼠标移动事件
     * @default true
     */
    touch?: boolean
    
    /**
     * 是否重置鼠标位置当组件卸载时
     * @default false
     */
    resetOnTouchEnds?: boolean
    
    /**
     * 初始值
     */
    initialValue?: Partial<MousePosition>
}

/**
 * 获取鼠标位置信息的hooks
 * @param options 配置选项
 * @returns 鼠标位置信息和相关方法
 */
export function useMouse(options: UseMouseOptions = {}) {
    const {
        touch = true,
        resetOnTouchEnds = false,
        initialValue = { x: 0, y: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, screenX: 0, screenY: 0 }
    } = options

    // 鼠标位置状态
    const x = ref(initialValue.x ?? 0)
    const y = ref(initialValue.y ?? 0)
    const clientX = ref(initialValue.clientX ?? 0)
    const clientY = ref(initialValue.clientY ?? 0)
    const pageX = ref(initialValue.pageX ?? 0)
    const pageY = ref(initialValue.pageY ?? 0)
    const screenX = ref(initialValue.screenX ?? 0)
    const screenY = ref(initialValue.screenY ?? 0)

    // 更新鼠标位置
    const updatePosition = (event: MouseEvent | TouchEvent) => {
        if ('touches' in event) {
            // 触摸事件
            const touch = event.touches[0]
            if (touch) {
                x.value = touch.clientX
                y.value = touch.clientY
                clientX.value = touch.clientX
                clientY.value = touch.clientY
                pageX.value = touch.pageX
                pageY.value = touch.pageY
                screenX.value = touch.screenX
                screenY.value = touch.screenY
            }
        } else {
            // 鼠标事件
            x.value = event.clientX
            y.value = event.clientY
            clientX.value = event.clientX
            clientY.value = event.clientY
            pageX.value = event.pageX
            pageY.value = event.pageY
            screenX.value = event.screenX
            screenY.value = event.screenY
        }
    }

    // 重置位置
    const reset = () => {
        x.value = initialValue.x ?? 0
        y.value = initialValue.y ?? 0
        clientX.value = initialValue.clientX ?? 0
        clientY.value = initialValue.clientY ?? 0
        pageX.value = initialValue.pageX ?? 0
        pageY.value = initialValue.pageY ?? 0
        screenX.value = initialValue.screenX ?? 0
        screenY.value = initialValue.screenY ?? 0
    }

    // 从事件中获取位置信息
    const getPositionFromEvent = (event: MouseEvent | TouchEvent): MousePosition => {
        if ('touches' in event) {
            const touch = event.touches[0] || event.changedTouches[0]
            return {
                x: touch.clientX,
                y: touch.clientY,
                clientX: touch.clientX,
                clientY: touch.clientY,
                pageX: touch.pageX,
                pageY: touch.pageY,
                screenX: touch.screenX,
                screenY: touch.screenY
            }
        } else {
            return {
                x: event.clientX,
                y: event.clientY,
                clientX: event.clientX,
                clientY: event.clientY,
                pageX: event.pageX,
                pageY: event.pageY,
                screenX: event.screenX,
                screenY: event.screenY
            }
        }
    }

    // 监听鼠标移动
    if (touch) {
        const handleMouseMove = (event: MouseEvent) => updatePosition(event)
        const handleTouchMove = (event: TouchEvent) => updatePosition(event)
        const handleTouchEnd = () => {
            if (resetOnTouchEnds) {
                reset()
            }
        }

        onMounted(() => {
            document.addEventListener('mousemove', handleMouseMove, { passive: true })
            document.addEventListener('touchmove', handleTouchMove, { passive: true })
            if (resetOnTouchEnds) {
                document.addEventListener('touchend', handleTouchEnd, { passive: true })
            }
        })

        onUnmounted(() => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('touchmove', handleTouchMove)
            if (resetOnTouchEnds) {
                document.removeEventListener('touchend', handleTouchEnd)
            }
        })
    }

    return {
        // 位置信息
        x: readonly(x),
        y: readonly(y),
        clientX: readonly(clientX),
        clientY: readonly(clientY),
        pageX: readonly(pageX),
        pageY: readonly(pageY),
        screenX: readonly(screenX),
        screenY: readonly(screenY),
        
        // 方法
        updatePosition,
        reset,
        getPositionFromEvent
    }
}
