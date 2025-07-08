import { useThemeStore } from '../store/modules/theme'

/**
 * 全屏管理Hook
 * 提供全屏切换、全屏状态检测等功能
 */
export function useFullscreen() {
    const themeStore = useThemeStore()

    // 是否支持全屏
    const isSupported = ref(false)

    // 是否处于全屏状态
    const isFullscreen = ref(false)

    // 检查全屏支持
    const checkSupport = () => {
        isSupported.value = !!(
            document.fullscreenEnabled ||
            (document as any).webkitFullscreenEnabled ||
            (document as any).mozFullScreenEnabled ||
            (document as any).msFullscreenEnabled
        )
    }

    // 更新全屏状态
    const updateFullscreenStatus = () => {
        const newStatus = !!(
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).mozFullScreenElement ||
            (document as any).msFullscreenElement
        )
        isFullscreen.value = newStatus
        themeStore.setFullscreen(newStatus)
    }

    // 进入全屏
    const enterFullscreen = async (element?: HTMLElement) => {
        if (!isSupported.value) return false

        const targetElement = element || document.documentElement

        try {
            if (targetElement.requestFullscreen) {
                await targetElement.requestFullscreen()
            } else if ((targetElement as any).webkitRequestFullscreen) {
                await (targetElement as any).webkitRequestFullscreen()
            } else if ((targetElement as any).mozRequestFullScreen) {
                await (targetElement as any).mozRequestFullScreen()
            } else if ((targetElement as any).msRequestFullscreen) {
                await (targetElement as any).msRequestFullscreen()
            }
            return true
        } catch (error) {
            console.error('Failed to enter fullscreen:', error)
            return false
        }
    }

    // 退出全屏
    const exitFullscreen = async () => {
        if (!isFullscreen.value) return false

        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen()
            } else if ((document as any).webkitExitFullscreen) {
                await (document as any).webkitExitFullscreen()
            } else if ((document as any).mozCancelFullScreen) {
                await (document as any).mozCancelFullScreen()
            } else if ((document as any).msExitFullscreen) {
                await (document as any).msExitFullscreen()
            }
            return true
        } catch (error) {
            console.error('Failed to exit fullscreen:', error)
            return false
        }
    }

    // 切换全屏
    const toggleFullscreen = async (element?: HTMLElement) => {
        if (isFullscreen.value) {
            return await exitFullscreen()
        } else {
            return await enterFullscreen(element)
        }
    }

    // 监听全屏变化事件
    const handleFullscreenChange = () => {
        updateFullscreenStatus()
    }

    // 监听键盘事件（ESC退出全屏）
    const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isFullscreen.value) {
            exitFullscreen()
        }
    }

    onMounted(() => {
        checkSupport()
        updateFullscreenStatus()

        // 添加事件监听
        document.addEventListener('fullscreenchange', handleFullscreenChange)
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
        document.addEventListener('mozfullscreenchange', handleFullscreenChange)
        document.addEventListener('MSFullscreenChange', handleFullscreenChange)
        document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
        // 移除事件监听
        document.removeEventListener('fullscreenchange', handleFullscreenChange)
        document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
        document.removeEventListener('mozfullscreenchange', handleFullscreenChange)
        document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
        document.removeEventListener('keydown', handleKeydown)
    })

    return {
        // state
        isSupported,
        isFullscreen,

        // actions
        enterFullscreen,
        exitFullscreen,
        toggleFullscreen
    }
}
